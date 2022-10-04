import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  service = new MatchesService();

  public routeHealth = (_req: Request, res: Response): void => {
    res.status(200).json({ ok: true, endpoint: '/matches' });
  };

  public getMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    let matches;

    if (inProgress) {
      switch (inProgress === 'true') {
        case true:
          matches = await this.service.getInProgressMatches();
          break;
        case false:
          matches = await this.service.getFinishedMatches();
          break;
        default:
          matches = await this.service.getAllMatches();
      }
    } else {
      matches = await this.service.getAllMatches();
    }

    res.status(200).json(matches);
  };
}

export default MatchesController;
