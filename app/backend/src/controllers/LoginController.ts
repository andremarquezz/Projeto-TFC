import { Request, Response } from 'express';
import ILoginInfo from '../interfaces/ILoginInfo';
import LoginService from '../services/LoginService';

class LoginController {
  service = new LoginService();

  public routeHealth = (_req: Request, res: Response): void => {
    res.json({ ok: true, endpoint: '/login' });
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: ILoginInfo = req.body;
    const token = await this.service.login({ email, password });
    res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response): Promise<void> => {
    const {
      user: { role },
    } = res.locals;
    res.status(200).json({ role });
  };
}

export default LoginController;
