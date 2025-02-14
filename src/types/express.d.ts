import { UserPayload } from 'utils/jwt'; // Import your User type

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
