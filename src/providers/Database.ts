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

const targetDurations = {
  '1s': 1000,
  '1m': 1000 * 60,
  '1h': 1000 * 60 * 60,
}

export class Database {
  public static init(): any {
    client.connect((err) => {
      if (err) {
				Log.error(err.stack);
				Log.error(`database connection error:\n${err.stack}`);
			}
    });
    // create signal_events table if it does not exist
    // create <product_code>_<duration> tables (durations: 1s, 1m, 1h)
    // error handler
  }

  // getCandleTableName method
}

export default client;
