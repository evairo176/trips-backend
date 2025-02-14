import { Router } from 'express';
import { authenticateJWT } from '../../middlewares';
import { getTripsController } from '../../controller/tripsController';

const tripsRouter = Router();

// register auth
tripsRouter.get('/', authenticateJWT, getTripsController);

export default tripsRouter;
