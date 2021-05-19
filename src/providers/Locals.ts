import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
	public static config(): any {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const port = process.env.PORT || 3000;
		const PgUser = process.env.PG_USER;
		const PgHost = process.env.PG_HOST;
		const PgDatabase = process.env.PG_DATABASE;
		const PgPassword = process.env.PG_PASSWORD;
		const PgPort = process.env.PG_PORT;
		return {
			port,
			PgUser,
			PgHost,
			PgDatabase,
			PgPassword,
			PgPort,
		};
	}

  public static init(_express: Application): Application {
    _express.locals.app = this.config()
    return _express;
  };
}

export default Locals;
