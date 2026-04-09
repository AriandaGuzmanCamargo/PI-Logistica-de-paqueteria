import { Router } from 'express';
import {
	getTracking,
	getTrackingPublico,
} from '../controllers/trackingController.js';

const trackingRouter = Router();

trackingRouter.post('/publico/:codigo', getTrackingPublico);
trackingRouter.get('/:codigo', getTracking);

export default trackingRouter;
