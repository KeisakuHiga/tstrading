import client from '../providers/Database';
import Log from '../middlewares/Log';
import Bitflyer from '../controllers/Bitflyer';
import moment from 'moment';

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
		dateTime: moment.Moment,
	): Promise<ICandle> | null {
    const truncatedDateTime: moment.Moment = Bitflyer.truncateTimestamp(dateTime, duration);
    const timeStr: string = Bitflyer.timestampToISO8601(truncatedDateTime)
    const sql = `
      SELECT * FROM ${productCode}_${duration}
      WHERE time = '${timeStr}'
    ;`
		try {
      const { rows  } = await client.query(sql);
      if (!rows[0]) {
        return null
			}
      return rows[0];
		} catch (err) {
      Log.error(err.message);
    }
	}

	// static async createCandleWithDuration(
	// 	ticker: Ticker,
	// 	productCode: string,
	// 	duration: string,
	// ): Promise<any> {
	// 	const { timestamp } = ticker;
	// 	// truncate timestamp by duration
	// 	const currentTime: string = bf.default.truncateTimestamp(
	// 		ticker.timestamp,
	// 		duration,
	// 	);
	// 	// check if there is candle
	// 	const currentCandle = this.getCandle(duration, currentTime);
	// 	if (!currentCandle) {
	// 		// create the first candle if there is not a candle
	// 		const sql = `
  //       INSERT INTO ${table_name}
  //       VALUES (${timestamp},${open},${close},${high},${low},${volume});
  //     `;
	// 		const result = client.query(sql);
	// 	} else {
	// 		// update current candle
	// 	}
	// }
}
