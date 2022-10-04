import * as jwt from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';

import 'express-async-errors';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const { JWT_SECRET } = process.env;

const generateToken = async (email: string): Promise<string> => {
  const payload: IJwtPayload = { email };
  return jwt.sign(payload, JWT_SECRET as string, jwtConfig);
};

export default generateToken;
