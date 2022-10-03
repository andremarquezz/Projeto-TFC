import { NextFunction, Request, Response } from 'express';
import ILoginInfo from '../interfaces/ILoginInfo';
import ErrorBadRequest from '../errors/ErrorBadRequest';

require('express-async-errors');

const validateInfoLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password }: ILoginInfo = req.body;
  if (!email || !password) {
    throw new ErrorBadRequest('All fields must be filled');
  }
  next();
};

export default validateInfoLogin;
