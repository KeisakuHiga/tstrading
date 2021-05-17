import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
	public static config(): any {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const port = process.env.PORT || 3000;

		return {
			port,
		};
	}

  public static init(_express: Application): Application {
    _express.locals.app = this.config()
    return _express;
  };
}

export default Locals;
