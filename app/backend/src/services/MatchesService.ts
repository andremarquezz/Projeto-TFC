import MatcheModel from '../database/models/MatcheModel';

import 'express-async-errors';
import TeamModel from '../database/models/TeamModel';

class MatchesService {
  model = MatcheModel;

  public async getAllMatches(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }

  public async getInProgressMatches(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: true,
      },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }

  public async getFinishedMatches(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: false,
      },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }
}

export default MatchesService;
