// Fixed Token Authentication Middleware
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export const fixedTokenMiddleware = (fixedToken: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // Remove 'Bearer ' prefix if present
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    if (actualToken !== fixedToken) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    next();
  };
};
