import { Router } from 'express';
import { loginSchema, registerSchema } from '../../libs/form-schema';
import { validate } from '../../libs/form-validate';
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '../../controller/authController';

const authRouter = Router();

// register auth
authRouter.post('/register', validate(registerSchema), registerController);

// User login route
authRouter.post('/login', validate(loginSchema), loginController);

// refresh token route
authRouter.post('/refresh-token', refreshTokenController);

// refresh token route
authRouter.post('/logout', logoutController);

export default authRouter;
