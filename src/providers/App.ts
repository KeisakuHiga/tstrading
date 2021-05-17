import Express from './Express';

class App {
  public loadServer(): void {
    // want to Log.info here
    console.log('Server booting');

    Express.init();
  }
}

export default new App;
