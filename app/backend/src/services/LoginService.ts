import * as Bcrypt from 'bcryptjs';
import ILoginInfo from '../interfaces/ILoginInfo';
import UserModel from '../database/models/UserModel';
import HashPassword from '../utils/HashPassword';
import ErrorUnauthorized from '../errors/ErrorUnauthorized';

import 'express-async-errors';
import generateToken from '../utils/generateToken';

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
      if (validPassword) return generateToken(userLogin.email);
    }
    throw new ErrorUnauthorized('Incorrect email or password');
  }
}

export default LoginService;
