import { Router } from 'express';

import HomeController from '../controllers/Home';
import BitflyerController from '../controllers/Bitflyer';

const router = Router();

router.get('/', HomeController.index);
router.get('/candles', HomeController.getCandles);
router.get('/bf/markets', BitflyerController.markets);
router.get('/bf/ticker', BitflyerController.ticker);

export default router;
