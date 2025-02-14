"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'supersecret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, ACCESS_SECRET, { expiresIn: '60m' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const verify = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        return verify;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
