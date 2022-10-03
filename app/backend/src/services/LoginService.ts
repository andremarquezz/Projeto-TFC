import * as Bcrypt from 'bcryptjs';
import ErrorNotFound from '../errors/ErrorNotFound';
import ILoginInfo from '../interfaces/ILoginInfo';
import UserModel from '../database/models/UserModel';
import HashPassword from '../utils/HashPassword';
import Jwt from '../utils/Jwt';
import ErrorUnauthorized from '../errors/ErrorUnauthorized';

import 'express-async-errors';

const jwt = new Jwt();

class LoginService {
  model = UserModel;
  bcrypt = new HashPassword(Bcrypt);

  public async login(userLogin: ILoginInfo): Promise<string> {
    const userDB = await this.model.findOne({
      where: {
        email: userLogin.email,
      },
    });

    if (userDB) {
      const userDbPassword = userDB.getDataValue('password');
      const validPassword = this.bcrypt.compare(userLogin.password, userDbPassword);
      if (validPassword) return jwt.generateToken(userLogin.email);
    }
    throw new ErrorUnauthorized('Incorrect email or password');
  }

  public async getRole(token: string): Promise<string> {
    const email = jwt.validateToken(token);
    const user = await this.model.findOne({
      where: { email },
    });
    if (user) return user.getDataValue('role');
    throw new ErrorNotFound('User not found');
  }
}

export default LoginService;
