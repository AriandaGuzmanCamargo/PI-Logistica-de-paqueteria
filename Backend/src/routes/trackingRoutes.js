import { Router } from 'express';
import { getTracking } from '../controllers/trackingController.js';

const trackingRouter = Router();

trackingRouter.get('/:codigo', getTracking);

export default trackingRouter;
