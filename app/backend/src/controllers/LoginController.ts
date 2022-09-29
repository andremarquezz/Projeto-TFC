import { Request, Response } from 'express';

class LoginController {
  public endpoint = (_req: Request, res: Response): void => {
    res.json({ ok: true, endpoint: '/login' });
  };
}

export default LoginController;
