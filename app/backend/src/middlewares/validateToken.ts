import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';
import ErrorUnauthorized from '../errors/ErrorUnauthorized';
import UserModel from '../database/models/UserModel';
import IResponseToken from '../interfaces/IResponseToken';

const { JWT_SECRET } = process.env;

const validateToken = async (req: Request, res: IResponseToken, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) throw new ErrorUnauthorized('token not found');

  try {
    const { email } = jwt.verify(token, JWT_SECRET as string) as IJwtPayload;
    const user = await UserModel.findOne({
      where: { email },
      attributes: ['email', 'role'],
    });
    if (!user) {
      throw new ErrorUnauthorized('User not found');
    }
    res.locals.user = user;
    next();
  } catch (error) {
    throw new ErrorUnauthorized('Token must be a valid token');
  }
};

export default validateToken;
