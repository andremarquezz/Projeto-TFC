import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  service = new LoginService();

  public routeHealth = (_req: Request, res: Response): void => {
    res.json({ ok: true, endpoint: '/login' });
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const userExists = await this.service.login({ username, password });
    res.status(200).json(userExists);
  };
}

export default LoginController;
