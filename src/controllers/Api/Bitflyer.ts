import axios, { AxiosResponse } from 'axios';
import express, { Response } from 'express';

interface Market {
	product_code: string;
	market_type: string;
}
const baseURL = 'https://api.bitflyer.com/v1';

class Bitflyer {
	public static async markets(req: any, res: any): Promise<any> {
		try {
			const { data } = await axios.get<Market[]>(`${baseURL}/markets`);
			return res.json({
				markets: data,
			});
		} catch (err) {
			console.log(err);
		}
	}
}

export default Bitflyer;