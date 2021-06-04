import App from './providers/App';
import Bitflyer from './controllers/Bitflyer';

App.loadServer();
App.loadDatabase();
Bitflyer.realTimeTicker();