"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tripsController_1 = require("@controller/tripsController");
const authMiddleware_1 = require("@middlewares/authMiddleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
// register auth
router.get('/', authMiddleware_1.authenticateJWT, tripsController_1.getTripsController);
exports.default = router;
