import axios, { AxiosRequestConfig } from 'axios';
import { Client } from 'jsonrpc2-ws';
import Log from '../../middlewares/Log';

interface Market {
	product_code: string;
	market_type: string;
	alias?: string;
}
interface Ticker {
	product_code: string;
	state: string;
	timestamp: string;
	tick_id: number;
	best_bid: number;
	best_ask: number;
	best_bid_size: number;
	best_ask_size: number;
	total_bid_depth: number;
	total_ask_depth: number;
	market_bid_size: number;
	market_ask_size: number;
	ltp: number;
	volume: number;
	volume_by_product: number;
}

interface ExtendedAxiosReqConf extends AxiosRequestConfig {
	params: {
		product_code?: string;
	}
}

const baseURL = 'https://api.bitflyer.com/v1';

export default class Bitflyer {
	static async markets(_: any, res: any): Promise<any> {
		try {
			const { data } = await axios.get<Market[]>(`${baseURL}/markets`);
			return res.json({
				markets: data,
			});
		} catch (err) {
			Log.error(err.message);
		}
	}

	static async ticker(req: any, res: any): Promise<any> {
		const options: ExtendedAxiosReqConf = {
			params: { product_code: req.query.product_code },
		};
		try {
			const { data } = await axios.get<Ticker>(`${baseURL}/ticker`, options);
			return res.json({
				ticker: data,
			});
		} catch (err) {
			Log.error(err.message);
		}
	}
	static async realTimeTicker(): Promise<any> {
		const publicChannels = ['lightning_ticker_BTC_JPY'];
		const client = new Client('wss://ws.lightstream.bitflyer.com/json-rpc');
		// connection handling
		client.on('connected', async () => {
			// subscribe to the Public Channels
			for (const channel of publicChannels) {
				try {
					await client.call('subscribe', { channel });
				} catch (e) {
					console.log(channel, 'Subscribe Error:', e);
					continue;
				}
				console.log(channel, 'Subscribed.');
			}
		});
		// channel messages handling
		client.methods.set('channelMessage', (client, notify) => {
			console.log('channelMessage', notify.channel, notify.message);
		});
	}
}
