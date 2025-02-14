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
exports.getTripsController = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../libs/logger"));
// API URL dari Socrata
const API_URL = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json';
//----------------------------------------------
// get trips controller
//----------------------------------------------
const getTripsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min_time, max_time, min_fare, max_fare, payment_type } = req.query;
        const response = yield axios_1.default.get(API_URL);
        let trips = response.data;
        if (!Array.isArray(trips)) {
            return res.status(500).json({ message: 'Invalid data format from API' });
        }
        // Filter berdasarkan waktu (pastikan pickup_datetime valid)
        if (min_time && max_time) {
            const minDate = new Date(min_time);
            const maxDate = new Date(max_time);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            trips = trips.filter((trip) => {
                if (!trip.pickup_datetime)
                    return false; // Skip jika tidak ada tanggal
                const tripDate = new Date(trip.pickup_datetime);
                return tripDate >= minDate && tripDate <= maxDate;
            });
        }
        // Filter berdasarkan fare_amount (pastikan valid)
        if (min_fare && max_fare) {
            const minFareNum = parseFloat(min_fare);
            const maxFareNum = parseFloat(max_fare);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            trips = trips.filter((trip) => {
                if (!trip.fare_amount)
                    return false; // Skip jika fare_amount tidak ada
                const fare = parseFloat(trip.fare_amount);
                return !isNaN(fare) && fare >= minFareNum && fare <= maxFareNum;
            });
        }
        // Filter berdasarkan payment_type (pastikan case-nya sama)
        if (payment_type) {
            const paymentTypeStr = payment_type.trim().toLowerCase();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            trips = trips.filter((trip) => {
                return (trip.payment_type &&
                    trip.payment_type.trim().toLowerCase() === paymentTypeStr);
            });
        }
        return res
            .status(200)
            .json({ message: 'Get trips successfully', data: trips });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            error: error.toString(),
        });
    }
});
exports.getTripsController = getTripsController;
