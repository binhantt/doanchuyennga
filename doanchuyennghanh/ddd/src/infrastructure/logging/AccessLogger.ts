import { Request, Response, NextFunction } from 'express';

export function accessLogger(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const method = req.method;
  const path = req.originalUrl;
  const ip = req.ip;
  console.log(`  vi tri nguoi  truy cap sever[${now}] ${method} ${path} - IP: ${ip}`);
  next();
}
