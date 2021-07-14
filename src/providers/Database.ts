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

class Database {
	public static init(): any {
		client.connect((err) => {
			if (err) {
				Log.error(err.stack);
				Log.error(`database connection error:\n${err.stack}`);
			}
		});
		Locals.config().durations.forEach((duration: string) => {
			Locals.config().productCodes.forEach((productCode: string) => {
				Database._dropTable(Database.getTableName(productCode, duration));
				Database._createTable(Database.getTableName(productCode, duration));
			})
		});
	}
	public static getTableName(productCode: string, duration: string): string {
		return `${productCode}_${duration}`;
	}
	private static async _dropTable(tableName: string): any {
		console.log('drop!!')
		const deleteFromTableSql = `
		DELETE FROM ${tableName};
		`;
		try {
			await client.query(deleteFromTableSql);
			Log.info(deleteFromTableSql);
		} catch (err) {
			Log.error(err.stack);
		}
	}
	private static async _createTable(tableName: string): any {
		console.log('create!!')
		const createTableSql = `
			CREATE TABLE IF NOT EXISTS ${tableName} (
				time TIMESTAMP WITH TIME ZONE NOT NULL,
				open NUMERIC,
				close NUMERIC,
				high NUMERIC,
				low NUMERIC,
				volume NUMERIC,
				PRIMARY KEY(time)
			);
		`;
		try {
			await client.query(createTableSql);
			Log.info(createTableSql);
		} catch (err) {
			Log.error(err.stack);
		}
	}
	// TODO select 実装
	// TODO insert into 実装
	// TODO update 実装
	// TODO delete 実装
}

export {
	Database,
	client
}
