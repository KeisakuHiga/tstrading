import express from 'express';

import Locals from './Locals';

class Express {
	public express: express.Application;

	constructor() {
		this.express = express();
	}

	public init(): any {
    const port: number = Locals.config().port;

		this.express.listen(port, (_error: any) => {
			if (_error) {
				return console.log('Error:', _error);
			}

			return console.log(
				'\x1b[33m%s\x1b[0m',
				`Server :: Running @ 'http://localhost:${port}'`,
			);
		});
	}
}

export default new Express();
