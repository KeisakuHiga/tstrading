import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

type NewType = Promise<object>;

export const markets = async (req: Request, res: Response): NewType => {
	try {
		const { data } = await axios.get('https://api.bitflyer.com/v1/markets');
		console.log(typeof data);
		res.json(data);
	} catch (err) {
		console.log(err);
	}
};
