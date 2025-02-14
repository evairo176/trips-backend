"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.refreshTokenController = exports.loginController = exports.registerController = void 0;
const database_1 = require("@libs/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("@libs/logger"));
const jwt_1 = require("@utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
//----------------------------------------------
// register controller
//----------------------------------------------
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result = yield database_1.db.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // Cek apakah email sudah terdaftar
            const existingUser = yield tx.user.findUnique({
                where: { email: body === null || body === void 0 ? void 0 : body.email },
            });
            if (existingUser) {
                throw new Error('Email sudah digunakan');
            }
            // Hash the password
            const hashedPassword = yield bcryptjs_1.default.hash(body === null || body === void 0 ? void 0 : body.password, 10);
            // Create a new user
            const user = yield tx.user.create({
                data: {
                    name: `${body === null || body === void 0 ? void 0 : body.firstName} ${body === null || body === void 0 ? void 0 : body.lastName}`,
                    email: body === null || body === void 0 ? void 0 : body.email.toLowerCase(),
                    password: hashedPassword,
                },
            });
            return { user }; // Returning the result of the transaction
        }));
        return res
            .status(201)
            .json({ message: `User ${result.user.name} registered successfully` });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // await sequelize.close(); // Ensure the connection is closed
        logger_1.default.error(error);
        return res.status(500).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            error: error,
        });
    }
});
exports.registerController = registerController;
//----------------------------------------------
// login controller
//----------------------------------------------
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield database_1.db.user.findFirst({
            where: {
                email: body === null || body === void 0 ? void 0 : body.email,
            },
        });
        if (!user) {
            logger_1.default.error(`400: Email not found`);
            return res.status(400).json({ message: 'Email not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(body === null || body === void 0 ? void 0 : body.password, user.password);
        if (!isPasswordValid) {
            logger_1.default.error(`400: Invalid credentials`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // ⬅️ Cookie tidak bisa diakses dari JavaScript
            secure: process.env.NODE_ENV === 'production' ? true : false, // ⬅️ Gunakan secure hanya di production
            sameSite: 'strict', // ⬅️ Mencegah serangan CSRF
        });
        res.json({
            message: `Login successfully`,
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    accessToken,
                    refreshToken,
                    accessTokenExpires: Date.now() + 60 * 60 * 1000,
                },
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // await sequelize.close(); // Ensure the connection is closed
        logger_1.default.error(error);
        return res.status(500).json({
            message: 'Internal server error, Please try again',
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.loginController = loginController;
//----------------------------------------------
// refresh token controller
//----------------------------------------------
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!refreshToken)
            return res.status(401).json({ message: 'Unauthorized' });
        const payload = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
        if (!payload)
            return res.status(403).json({ message: 'Invalid refresh token' });
        const accessToken = (0, jwt_1.generateAccessToken)(payload.userId);
        res.json({ accessToken, accessTokenExpires: Date.now() + 60 * 60 * 1000 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // await sequelize.close(); // Ensure the connection is closed
        return res.status(500).json({
            message: 'Internal server error, Please try again',
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.refreshTokenController = refreshTokenController;
//----------------------------------------------
// logout controller
//----------------------------------------------
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out' });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // await sequelize.close(); // Ensure the connection is closed
        logger_1.default.error(error);
        return res.status(500).json({
            message: 'Internal server error, Please try again',
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.logoutController = logoutController;
