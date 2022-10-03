import TeamModel from '../database/models/TeamModel';

import 'express-async-errors';

class TeamsService {
  model = TeamModel;

  public async getAllTeams(): Promise<TeamModel[]> {
    const teams = await this.model.findAll();
    console.log(teams);
    return teams;
  }

  public async getOneTeam(id: string): Promise<TeamModel | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}

export default TeamsService;
