import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user as { id: number, name: string, email: string };
    next();
  } catch { return res.status(401).json({ error: 'Invalid token' }); }
}
