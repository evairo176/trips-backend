import { Request, Response, NextFunction } from 'express';

import Logger from '@libs/logger';
import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'supersecret';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req?.headers?.authorization?.startsWith('Bearer')) {
    return res
      .status(401)
      .json({ message: 'There is no token attached to the header' });
  }

  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verify = jwt.verify(token, ACCESS_SECRET) as { userId: string };
    req.user = verify;

    next();
  } catch (error) {
    Logger.error(error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
