import * as jwt from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';
import ErrorUnauthorized from '../errors/ErrorUnauthorized';

import 'express-async-errors';

const { JWT_SECRET } = process.env;

class Jwt {
  jwtConfig: jwt.SignOptions;
  constructor() {
    this.jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  }

  generateToken = async (email: string): Promise<string> => {
    const payload: IJwtPayload = { email };
    return jwt.sign(payload, JWT_SECRET as string, this.jwtConfig);
  };

  validateToken = (token: string) => {
    try {
      const { email } = jwt.verify(token, JWT_SECRET as string) as IJwtPayload;
      return email;
    } catch (error) {
      throw new ErrorUnauthorized('Expired or invalid token');
    }
  };
}
export default Jwt;
