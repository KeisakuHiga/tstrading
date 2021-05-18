import Express from './Express';
import Log from '../middlewares/Log';

class App {
  public loadServer(): void {
    Log.info('Server :: Booting @ Master...');
    Express.init();
  }
}

export default new App;
