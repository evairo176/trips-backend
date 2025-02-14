import { Router } from 'express';
import { validate } from '../libs/form-validate';
import { loginSchema, registerSchema } from '../libs/form-schema';
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '@controller/authController';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: evairo176
 *               password:
 *                 type: string
 *                 example: 1234567
 *               email:
 *                 type: string
 *                 example: evairo176@gmail.com
 *               role:
 *                 type: string
 *                 example: admin4
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input data.
 */

// register auth
router.post('/register', validate(registerSchema), registerController);

// User login route
router.post('/login', validate(loginSchema), loginController);

// refresh token route
router.post('/refresh-token', refreshTokenController);

// refresh token route
router.post('/logout', logoutController);

export default router;
