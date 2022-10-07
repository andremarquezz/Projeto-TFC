import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import ILeaderboards from '../interfaces/ILeaderboard';
import LeaderBoardStats from '../utils/LeaderboardStats';
import IMatchesTeam from '../interfaces/IMatchesTeam';

import 'express-async-errors';

class LeaderboardService {
  model = TeamModel;

  private buildLeaderboards = (matchesByTeams: TeamModel[]) => {
    const leaderboard = matchesByTeams.reduce((acc, team) => {
      const leaderBoardStats = new LeaderBoardStats(team as IMatchesTeam);
      return [...acc, leaderBoardStats.board];
    }, [] as ILeaderboards[]);

    return leaderboard;
  };

  public async classificationHome() {
    const matchesByTeams = await this.model.findAll({
      attributes: {
        exclude: ['id'],
      },
      include: {
        model: MatcheModel,
        as: 'homeMatches',
        where: {
          inProgress: false,
        },
        attributes: {
          exclude: ['id', 'inProgress'],
        },
      },
    });
    return this.buildLeaderboards(matchesByTeams);
  }
}

export default LeaderboardService;
