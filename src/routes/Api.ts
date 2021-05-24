import { Router } from 'express';

import HomeController from '../controllers/Api/Home';
import BitflyerController from '../controllers/Api/Bitflyer';

const router = Router();

router.get('/', HomeController.index);
router.get('/bf/markets', BitflyerController.markets);

export default router;