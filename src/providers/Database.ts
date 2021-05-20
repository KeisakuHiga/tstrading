import { Client } from 'pg';
import Locals from './Locals';
import Log from '../middlewares/Log';

const client = new Client({
  user: Locals.config().PgUser,
  host: Locals.config().PgHost,
  database: Locals.config().PgDatabase,
  password: Locals.config().PgPassword,
  port: Locals.config().PgPort,
});

export class Database {
  public static init(): any {
    client.connect((err) => {
      if (err) {
				Log.error(err.stack);
				Log.error(`database connection error:\n${err.stack}`);
			}
    });
  }
}

export default client;
