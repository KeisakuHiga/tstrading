import { Router } from 'express';

import Locals from '../providers/Locals';

const router = Router();

router.get('/', (req, res): any => {
  res.json({
    message: Locals.config().name
  });
});

export default router;