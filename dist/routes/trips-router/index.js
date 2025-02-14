"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const tripsController_1 = require("../../controller/tripsController");
const tripsRouter = (0, express_1.Router)();
// register auth
tripsRouter.get('/', middlewares_1.authenticateJWT, tripsController_1.getTripsController);
exports.default = tripsRouter;
