import { db } from '@libs/database';
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import Logger from '@libs/logger';
import { generateAccessToken, generateRefreshToken } from '@utils/jwt';
import jwt from 'jsonwebtoken';

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
//----------------------------------------------
// register controller
//----------------------------------------------
export const registerController = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const result = await db.$transaction(async (tx) => {
      // Cek apakah email sudah terdaftar
      const existingUser = await tx.user.findUnique({
        where: { email: body?.email },
      });

      if (existingUser) {
        throw new Error('Email sudah digunakan');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(body?.password, 10);

      // Create a new user
      const user = await tx.user.create({
        data: {
          name: `${body?.firstName} ${body?.lastName}`,
          email: body?.email.toLowerCase(),
          password: hashedPassword,
        },
      });

      return { user }; // Returning the result of the transaction
    });

    return res
      .status(201)
      .json({ message: `User ${result.user.name} registered successfully` });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // await sequelize.close(); // Ensure the connection is closed
    Logger.error(error);
    return res.status(500).json({
      message: error?.message,
      error: error,
    });
  }
};

//----------------------------------------------
// login controller
//----------------------------------------------
export const loginController = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const user = await db.user.findFirst({
      where: {
        email: body?.email,
      },
    });

    if (!user) {
      Logger.error(`400: Email not found`);
      return res.status(400).json({ message: 'Email not found' });
    }

    const isPasswordValid = await bcrypt.compare(body?.password, user.password);
    if (!isPasswordValid) {
      Logger.error(`400: Invalid credentials`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

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
  } catch (error: any) {
    // await sequelize.close(); // Ensure the connection is closed
    Logger.error(error);
    return res.status(500).json({
      message: 'Internal server error, Please try again',
      error: error?.message,
    });
  }
};

//----------------------------------------------
// refresh token controller
//----------------------------------------------
export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req?.body?.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as {
      userId: string;
    };

    if (!payload)
      return res.status(403).json({ message: 'Invalid refresh token' });

    const accessToken = generateAccessToken(payload.userId);
    res.json({ accessToken, accessTokenExpires: Date.now() + 60 * 60 * 1000 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // await sequelize.close(); // Ensure the connection is closed

    return res.status(500).json({
      message: 'Internal server error, Please try again',
      error: error?.message,
    });
  }
};

//----------------------------------------------
// logout controller
//----------------------------------------------
export const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // await sequelize.close(); // Ensure the connection is closed
    Logger.error(error);
    return res.status(500).json({
      message: 'Internal server error, Please try again',
      error: error?.message,
    });
  }
};
