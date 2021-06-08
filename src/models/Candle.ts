import client from '../providers/Database';
import Log from '../middlewares/Log';
import moment from 'moment';
import { unitOfTime } from 'moment';

interface Ticker {
  product_code: string,
  state: string,
  timestamp: string,
  tick_id: number,
  best_bid: number,
  best_ask: number,
  best_bid_size: number,
  best_ask_size: number,
  total_bid_depth: number,
  total_ask_depth: number,
  market_bid_size: number,
  market_ask_size: number,
  ltp: number,
  volume: number,
  volume_by_product: number
}

interface ICandle {
	time: Date;
	open: number;
	close: number;
	high: number;
	low: number;
	volume: number;
} 
export default class Candle {
	static async getCandle(
		productCode: string,
		duration: string,
		timestamp: moment.Moment,
	): Promise<ICandle> | null {
		const currentTime: moment.Moment = moment
			.utc(timestamp)
			.startOf(duration as unitOfTime.StartOf);
		const timeStr: string = moment(currentTime).toISOString();
    const sql = `
      SELECT * FROM ${productCode}_${duration}
      WHERE time = '${timeStr}'
    ;`
		Log.info(sql);
		try {
			const { rows  } = await client.query(sql);
			Log.info(typeof rows[0]);
      if (!rows[0]) {
        return null
			}
      return rows[0];
		} catch (err) {
      Log.error(err.message);
    }
	}

	static async createCandleWithDuration(
		ticker: Ticker,
		productCode: string,
		duration: string,
	): Promise<any> {
		const { timestamp } = ticker;
		// truncate timestamp by duration
		const currentTime: moment.Moment = moment
			.utc(timestamp)
			.startOf(duration as unitOfTime.StartOf);
		// check if there is candle
		const currentCandle: ICandle = await this.getCandle(
			productCode,
			duration,
			currentTime,
		);
		if (!currentCandle) {
			// create the first candle if there is not a candle
			return 'nothing record!';
			// 	const sql = `
			//     INSERT INTO ${table_name}
			//     VALUES (${timestamp},${open},${close},${high},${low},${volume});
			//   `;
			// 	const result = client.query(sql);
		}
		// update current candle
		return currentCandle;
	}
}
