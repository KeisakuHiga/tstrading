import App from './providers/App';
import Bitflyer from './controllers/Api/Bitflyer';

App.loadServer();
App.loadDatabase();
Bitflyer.realTimeTicker();