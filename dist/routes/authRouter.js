"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_validate_1 = require("@libs/form-validate");
const form_schema_1 = require("@libs/form-schema");
const authController_1 = require("@controller/authController");
const router = (0, express_1.Router)();
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
router.post('/register', (0, form_validate_1.validate)(form_schema_1.registerSchema), authController_1.registerController);
// User login route
router.post('/login', (0, form_validate_1.validate)(form_schema_1.loginSchema), authController_1.loginController);
// refresh token route
router.post('/refresh-token', authController_1.refreshTokenController);
// refresh token route
router.post('/logout', authController_1.logoutController);
exports.default = router;
