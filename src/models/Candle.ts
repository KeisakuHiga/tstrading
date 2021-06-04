import client from '../providers/Database';
import Log from '../middlewares/Log';
import * as bf from '../controllers/Bitflyer';

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

export default class Candle {
	static async getCandle(product_code: string, duration: string, dateTime: string): Promise<any> {
		try {
			const { rows } = await client.query('SELECT NOW() as now');
			console.log(rows[0]);
		} catch (err) {
			Log.error(err.message);
		}
	}
  static async createCandleWithDuration(ticker: Ticker, productCode: string, duration: Date): Promise<any> {
    const { timestamp, } = ticker;
    // check if there is candle
    let sql = `
      SELECT * FROM btc_jpy_${duration}
      WHERE time = ${}
    `
    
    const currentCandle = client.query(sql)
    // create the first candle if there is not a candle
    // update 
    sql = `
      INSERT INTO ${table_name}
      VALUES (${timestamp},${open_price},${close_price},${high_price},${low_price},${volume});
    `;
	}
}
