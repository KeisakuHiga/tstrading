import express from 'express';

class Home {
	public static index(req: express.Request, res: express.Response): any {
		return res.json({
			message: 'hello world',
		});
	}
}

export default new Home