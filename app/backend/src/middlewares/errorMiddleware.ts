import { Request, Response, NextFunction } from 'express';
import { ICustomError } from '../interfaces/ICustomError';

const errorMiddleware = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(err.code || 500).json({ message: err.message });
  _next();
};

export default errorMiddleware;
