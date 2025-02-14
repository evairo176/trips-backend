"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_schema_1 = require("../../libs/form-schema");
const form_validate_1 = require("../../libs/form-validate");
const authController_1 = require("../../controller/authController");
const authRouter = (0, express_1.Router)();
// register auth
authRouter.post('/register', (0, form_validate_1.validate)(form_schema_1.registerSchema), authController_1.registerController);
// User login route
authRouter.post('/login', (0, form_validate_1.validate)(form_schema_1.loginSchema), authController_1.loginController);
// refresh token route
authRouter.post('/refresh-token', authController_1.refreshTokenController);
// refresh token route
authRouter.post('/logout', authController_1.logoutController);
exports.default = authRouter;
