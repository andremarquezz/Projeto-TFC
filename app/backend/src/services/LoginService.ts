import ILoginInfo from '../interfaces/ILoginInfo';
import UserModel from '../database/models/UserModel';

class LoginService {
  model = UserModel;

  public login(userInfo: ILoginInfo) {
    return this.model.findOne({
      where: {
        username: userInfo.username,
        password: userInfo.password,
      },
    });
  }
}

export default LoginService;
