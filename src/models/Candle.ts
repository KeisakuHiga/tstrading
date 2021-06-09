import client from '../providers/Database';
import Log from '../middlewares/Log';
import moment from 'moment';
import { unitOfTime } from 'moment';

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
		timestamp: string,
	): Promise<ICandle> | null {
		const currentTime: moment.Moment = moment
			.utc(timestamp)
			.startOf(duration as unitOfTime.StartOf);
		const timeStr: string = moment(currentTime).toISOString();
		const sql = `
      SELECT * FROM ${productCode}_${duration}
      WHERE time = '${timeStr}';
    `;
		Log.info(sql);
		try {
			const { rows } = await client.query(sql);
			if (!rows[0]) {
				return null;
			}
			return rows[0];
		} catch (err) {
			Log.error(err.message);
		}
	}

	static async createCandleWithDuration(
		ticker: Ticker,
		duration: string,
	): Promise<boolean | Error> {
		const { product_code: productCode, timestamp, ltp, volume } = ticker;

		// truncate timestamp by duration
		const currentTime: string = moment
			.utc(timestamp)
			.startOf(duration as unitOfTime.StartOf)
			.toISOString();

		// check if there is candle
		const currentCandle: ICandle = await this.getCandle(
			productCode,
			duration,
			currentTime,
		);
		if (!currentCandle) {
			// create the first candle if there is not a candle
			const sql = `
				INSERT INTO ${productCode}_${duration}
				VALUES ('${currentTime}',${ltp},${ltp},${ltp},${ltp},${volume});
			`;
			Log.info(sql);
			try {
				await client.query(sql);
				return true;
			} catch (err) {
				Log.error(err.message);
				return new Error('Fail to insert new candle');
			}
		} else {
			// update current candle
			const newCandle: ICandle = {
				time: currentCandle.time,
				open: currentCandle.open,
				close: currentCandle.close,
				high: currentCandle.high,
				low: currentCandle.low,
				volume: currentCandle.volume,
			};
			if (currentCandle.high < ltp) {
				newCandle.high = ltp;
			}
			if (currentCandle.low > ltp) {
				newCandle.low = ltp;
			}
			newCandle.close = ltp;
			newCandle.volume = volume;

			const sql = `
				UPDATE ${productCode}_${duration}
				SET
					time = '${currentTime}',
					open = ${newCandle.open},
					close = ${newCandle.close},
					high = ${newCandle.high},
					low = ${newCandle.low},
					volume = ${newCandle.volume}
				WHERE time = '${currentTime}';
			`;
			Log.info(sql);
			try {
				await client.query(sql);
				Log.info('succeeded updating candle');
				return false;
			} catch (err) {
				Log.error(err.message);
				return new Error('Fail to update candle');
			}
		}
	}
}
