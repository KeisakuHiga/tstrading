import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { unitOfTime } from 'moment';
import { Client } from 'jsonrpc2-ws';
import Log from '../middlewares/Log';
import Locals from '../providers/Locals';

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
	};
}

const baseURL = 'https://api.bitflyer.com/v1';
const bfWsLightStreamURL = 'wss://ws.lightstream.bitflyer.com/json-rpc';

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
	static realTimeTicker(): void {
		const publicChannels = Bitflyer.getPublicChannels();
		const client = new Client(bfWsLightStreamURL);
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
			console.log('*'.repeat(50));
			console.log('channelMessage', notify.channel, notify.message);
		});
		// example of notify.message
		// {
		//   "product_code": "BTC_JPY",
		//   "timestamp": "2019-04-11T05:14:12.3739915Z",
		//   "state": "RUNNING",
		//   "tick_id": 25965446,
		//   "best_bid": 580006,
		//   "best_ask": 580771,
		//   "best_bid_size": 2.00000013,
		//   "best_ask_size": 0.4,
		//   "total_bid_depth": 1581.64414981,
		//   "total_ask_depth": 1415.32079982,
		//   "market_bid_size": 0,
		//   "market_ask_size": 0,
		//   "ltp": 580790,
		//   "volume": 6703.96837634,
		//   "volume_by_product": 6703.96837634
		// }

		// insert notify.message into database
	}
	static getPublicChannels(): Array<string> {
		const pcs = Locals.config().productCodes;
		const list: Array<string> = [];
		pcs.forEach((pc: string) => {
			list.push(`lightning_ticker_${pc}`);
		});
		return list;
	}

	/**
	 * timestampをString型でISO8601に変換する
	 * @param timestamp moment.Moment
	 * @returns string
	 */
	static timestampToISO8601(timestamp: moment.Moment): string {
		return moment(timestamp).toISOString();
	}

	/**
	 * durationに合わせてtimestampを整える（duration='hour'なら'second'以下を切り捨て）
	 * @param timestamp moment.Moment
	 * @param duration string
	 * @returns moment.Moment
	 */
	static truncateTimestamp(
		timestamp: moment.Moment,
		duration: string,
	): moment.Moment {
		const period: string = duration;
		return moment.utc(timestamp).startOf(period as unitOfTime.StartOf);
	}
}
