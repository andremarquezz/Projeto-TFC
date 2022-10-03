import { Request, Response } from 'express';
import ITeam from '../interfaces/ITeam';
import TeamsService from '../services/TeamsService';

class TeamsController {
  service = new TeamsService();

  public routeHealth = (_req: Request, res: Response): void => {
    res.status(200).json({ ok: true, endpoint: '/teams' });
  };

  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = (await this.service.getAllTeams());
    res.status(200).json(teams);
  };

  public getOneTeam = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = (await this.service.getOneTeam(id)) as ITeam;
    res.status(200).json(team);
  };
}

export default TeamsController;
