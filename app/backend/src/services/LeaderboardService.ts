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

  private sortLeaderboards = (leaderboard: ILeaderboards[]) =>
    leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return 0;
    });

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
    const leaderboard = this.buildLeaderboards(matchesByTeams);
    return this.sortLeaderboards(leaderboard);
  }
}

export default LeaderboardService;
