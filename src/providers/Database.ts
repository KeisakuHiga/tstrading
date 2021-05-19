import { Client } from 'pg';
import Locals from './Locals';
import Log from '../middlewares/Log';

export class Database {
  public static init(): any {
		const client = new Client({
			user: Locals.config().PgPort,
			host: Locals.config().PgHost,
			database: Locals.config().PgDatabase,
			password: Locals.config().PgPassword,
			port: Locals.config().PgPort
		});
		client.connect((err) => {
      if (err) {
				Log.error(err.stack);
				Log.error(`database connection error:\n${err.stack}`);
			} else {
				Log.info('database connected');
			}
    });
    // client.query('SELECT $1::text as message', ['Hello world!'], (err: { stack: any; }, res: { rows: { message: any; }[]; }) => {
		// 	console.log(err ? err.stack : res.rows[0].message); // Hello World!
		// 	client.end();
		// });
  }
}
