import { Request, Response } from 'express';
import IUpdateGoals from '../interfaces/IUpdateGoals';
import iSaveMatch from '../interfaces/ISaveMatch';
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

  public saveMatch = async (req: Request, res: Response): Promise<void> => {
    const infoMatch: iSaveMatch = req.body;
    const match = await this.service.saveMatch(infoMatch);
    res.status(201).json(match);
  };

  public updateMatch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const goals = req.body;
    const informationUpdate: IUpdateGoals = { id, goals };
    this.service.updateMatch(informationUpdate);
    res.status(200).json({ message: 'updated' });
  };

  public endMatch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.service.endMatch(id);
    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
