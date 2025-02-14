import { Response, Request } from 'express';
import Logger from '@libs/logger';
import axios from 'axios';

// API URL dari Socrata
const API_URL = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json';

//----------------------------------------------
// get trips controller
//----------------------------------------------
export const getTripsController = async (req: Request, res: Response) => {
  try {
    const { min_time, max_time, min_fare, max_fare, payment_type } = req.query;
    const response = await axios.get(API_URL);
    let trips = response.data;

    if (!Array.isArray(trips)) {
      return res.status(500).json({ message: 'Invalid data format from API' });
    }

    // Filter berdasarkan waktu (pastikan pickup_datetime valid)
    if (min_time && max_time) {
      const minDate = new Date(min_time as string);
      const maxDate = new Date(max_time as string);

      trips = trips.filter((trip: any) => {
        if (!trip.pickup_datetime) return false; // Skip jika tidak ada tanggal
        const tripDate = new Date(trip.pickup_datetime);
        return tripDate >= minDate && tripDate <= maxDate;
      });
    }

    // Filter berdasarkan fare_amount (pastikan valid)
    if (min_fare && max_fare) {
      const minFareNum = parseFloat(min_fare as string);
      const maxFareNum = parseFloat(max_fare as string);

      trips = trips.filter((trip: any) => {
        if (!trip.fare_amount) return false; // Skip jika fare_amount tidak ada
        const fare = parseFloat(trip.fare_amount);
        return !isNaN(fare) && fare >= minFareNum && fare <= maxFareNum;
      });
    }

    // Filter berdasarkan payment_type (pastikan case-nya sama)
    if (payment_type) {
      const paymentTypeStr = (payment_type as string).trim().toLowerCase();
      trips = trips.filter((trip: any) => {
        return (
          trip.payment_type &&
          trip.payment_type.trim().toLowerCase() === paymentTypeStr
        );
      });
    }

    return res
      .status(200)
      .json({ message: 'Get trips successfully', data: trips });
  } catch (error: any) {
    Logger.error(error);
    return res.status(500).json({
      message: error?.message,
      error: error.toString(),
    });
  }
};
