import { Request, Response, NextFunction } from "express";

const FIXED_TOKEN = "TOKEN-SECRETO-123";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-api-token"];

  if (token !== FIXED_TOKEN) {
    return res.status(401).json({ error: "Token inválido" });
  }

  next();
}
