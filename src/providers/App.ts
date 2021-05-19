import Express from './Express';
import { Database } from './Database';
import Log from '../middlewares/Log';

class App {
  public loadServer(): void {
    Log.info('Server :: Booting @ Master...');
    Express.init();
  }

  public loadDatabase(): void {
    Log.info('Database :: Booting @ Master...');

    Database.init();
  }
}

export default new App;
