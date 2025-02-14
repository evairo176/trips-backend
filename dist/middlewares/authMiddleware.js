"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const logger_1 = __importDefault(require("@libs/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'supersecret';
const authenticateJWT = (req, res, next) => {
    var _a, _b, _c;
    if (!((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith('Bearer'))) {
        return res
            .status(401)
            .json({ message: 'There is no token attached to the header' });
    }
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    }
    try {
        const verify = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        req.user = verify;
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateJWT = authenticateJWT;
