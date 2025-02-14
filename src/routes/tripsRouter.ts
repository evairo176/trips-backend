import { getTripsController } from '@controller/tripsController';
import { authenticateJWT } from '@middlewares/authMiddleware';
import { Router } from 'express';

const router = Router();

// register auth
router.get('/', authenticateJWT, getTripsController);

export default router;
