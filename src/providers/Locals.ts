import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
	public static config(): any {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const name = 'Keisaku Higa';
		const port = process.env.PORT || 3000;
		const PgUser = process.env.PG_USER;
		const PgHost = process.env.PG_HOST;
		const PgDatabase = process.env.PG_DATABASE;
		const PgPassword = process.env.PG_PASSWORD;
		const PgPort = process.env.PG_PORT;

		const apiPrefix = process.env.API_PREFIX || 'api';
		
		const bfApiKey = process.env.BF_API_KEY;
		const bfApiSecret = process.env.BF_API_SECRET;
		const productCodes = process.env.BF_PRODUCT_CODES.split(',');
		return {
			name,
			port,
			PgUser,
			PgHost,
			PgDatabase,
			PgPassword,
			PgPort,
			apiPrefix,
			bfApiKey,
			bfApiSecret,
			productCodes,
		};
	}

  public static init(_express: Application): Application {
    _express.locals.app = this.config()
    return _express;
  };
}

export default Locals;
