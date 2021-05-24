import express from 'express';

import Locals from './Locals';
import Routes from './Routes';

class Express {
	public express: express.Application;

	constructor() {
		this.express = express();
		this.mountRoutes();
	}

	private mountRoutes(): void {
		this.express = Routes.mountApi(this.express);
	}

	public init(): any {
    const port: number = Locals.config().port;

		this.express.listen(port, (): void => {

			return console.log(
				'\x1b[33m%s\x1b[0m',
				`Server :: Running @ 'http://localhost:${port}'`,
			);
		});
	}
}

export default new Express();
