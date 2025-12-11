// JWT Authentication Middleware (for user sessions)
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const jwtAuthMiddleware = (jwtSecret: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['x-user-token'];

    if (!authHeader) {
      res.status(401).json({ error: 'No user token provided' });
      return;
    }

    try {
      const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid user token' });
    }
  };
};
