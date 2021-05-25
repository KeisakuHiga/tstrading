import axios from 'axios';
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

const baseURL = 'https://api.bitflyer.com/v1';

class Bitflyer {
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
		const { product_code } = req.query;
		try {
			const { data } = await axios.get<Ticker>(
				`${baseURL}/ticker?product_code=${product_code}`,
			);
			return res.json({
				ticker: data,
			});
		} catch (err) {
			Log.error(err.message);
		}
	}
}

export default Bitflyer;
