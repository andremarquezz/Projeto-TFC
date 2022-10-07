import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  service = new LeaderboardService();

  public routeHealth = (_req: Request, res: Response): void => {
    res.json({ ok: true, endpoint: '/leaderboard' });
  };

  public classificationHome = async (_req: Request, res: Response): Promise<void> => {
    const leaderboardHome = await this.service.classificationHome();
    res.status(200).json(leaderboardHome);
  };
}

export default LeaderboardController;
