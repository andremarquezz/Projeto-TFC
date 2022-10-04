import MatcheModel from '../database/models/MatcheModel';

import 'express-async-errors';
import TeamModel from '../database/models/TeamModel';
import iSaveMatch from '../interfaces/ISaveMatch';
import ErrorUnauthorized from '../errors/ErrorUnauthorized';
import ErrorNotFound from '../errors/ErrorNotFound';
import IUpdateGoals from '../interfaces/IUpdateGoals';

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

  public validateMatches = async (
    homeTeam: number,
    awayTeam: number,
  ): Promise<boolean> => {
    if (homeTeam === awayTeam) {
      throw new ErrorUnauthorized(
        'It is not possible to create a match with two equal teams',
      );
    }
    const team1 = await TeamModel.findByPk(homeTeam);
    const team2 = await TeamModel.findByPk(awayTeam);
    if (!team1 || !team2) throw new ErrorNotFound('There is no team with such id!');
    return true;
  };

  public async saveMatch(infoMatch: iSaveMatch): Promise<MatcheModel | null> {
    await this.validateMatches(infoMatch.homeTeam, infoMatch.awayTeam);
    const createMatch = await this.model.create({
      homeTeam: infoMatch.homeTeam,
      awayTeam: infoMatch.awayTeam,
      homeTeamGoals: infoMatch.homeTeamGoals,
      awayTeamGoals: infoMatch.awayTeamGoals,
      inProgress: infoMatch.inProgress,
    });
    const id = createMatch.getDataValue('id');

    const match = this.model.findByPk(id);
    return match;
  }

  public async updateMatch({ id, goals }: IUpdateGoals) {
    await this.model.update(
      {
        homeTeamGoals: goals.homeTeamGoals,
        awayTeamGoals: goals.awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  public async endMatch(id: string) {
    await this.model.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}

export default MatchesService;
