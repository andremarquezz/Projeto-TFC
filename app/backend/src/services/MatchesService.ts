import MatcheModel from '../database/models/MatcheModel';

import 'express-async-errors';

class MatchesService {
  model = MatcheModel;

  public async getAllMatches(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll();
    return matches;
  }

  public async getInProgressMatches(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: 1,
      },
    });
    return matches;
  }

  public async getFinishedMatches(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: 0,
      },
    });
    return matches;
  }
}

export default MatchesService;
