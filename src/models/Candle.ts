import client from '../providers/Database';
import Log from '../middlewares/Log';

class Candle {
	static async getCandle(/* product_code: string, duration: string, dateTime: string */): Promise<any> {
		try {
			const { rows } = await client.query('SELECT NOW() as now');
			console.log(rows[0]);
		} catch (err) {
			Log.error(err.message);
		}
	}
}

export default Candle;
