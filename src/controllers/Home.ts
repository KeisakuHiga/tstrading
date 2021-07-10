import Locals from '../providers/Locals';
import Candles from '../models/Candle';

interface ICandle {
	time: Date;
	open: number;
	close: number;
	high: number;
	low: number;
	volume: number;
}

class Home {
	public static index(req: any, res: any): any {
		return res.json({
			message: Locals.config().name,
		});
	}
	public static async getCandles(req: any, res: any): Promise<any> {
		const result: ICandle[] = await Candles.getCandles('BTC_JPY', 'minute');
		return res.json({
			candles: result
		});
	}
}

export default Home;
