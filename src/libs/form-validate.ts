import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // await sequelize.close(); // Ensure the connection is closed
      return res
        .status(400)
        .json({ message: 'Invalid request', error: err.errors });
    }
  };
