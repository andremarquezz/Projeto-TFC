import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  service = new LeaderboardService();

  public routeHealth = (_req: Request, res: Response): void => {
    res.json({ ok: true, endpoint: '/leaderboard' });
  };

  // public classificationHome = (_req: Request, res: Response): void => {};
}

export default LeaderboardController;
