import ILeaderboards from '../interfaces/ILeaderboard';
import IMatchesTeam, { Matches } from '../interfaces/IMatchesTeam';
import { ITeamResults } from '../interfaces/ITeamResults';

class LeaderBoardStats {
  private _teamName: string;
  private _teamResults: ITeamResults;
  private _goalsHome: number;
  private _goalsAway: number;
  private _board: ILeaderboards;

  constructor({ teamName, homeMatches }: IMatchesTeam) {
    this._teamResults = this.getTeamResults(homeMatches);
    this._goalsHome = homeMatches.reduce(
      (acc, { homeTeamGoals }) => acc + homeTeamGoals,
      0,
    );
    this._goalsAway = homeMatches.reduce(
      (acc, { awayTeamGoals }) => acc + awayTeamGoals,
      0,
    );
    this._teamName = teamName;
  }

  private getTeamResults = (homeMatches: Matches[]): ITeamResults =>
    homeMatches.reduce(
      (acc, match) => {
        const matchGoals = match.homeTeamGoals - match.awayTeamGoals;
        if (matchGoals > 0) acc.wins += 1;
        if (matchGoals < 0) acc.loses += 1;
        if (matchGoals === 0) acc.draws += 1;
        return acc;
      },
      { wins: 0, draws: 0, loses: 0 },
    );

  get totalPoints() {
    const { wins, draws } = this._teamResults;
    return wins * 3 + draws;
  }

  get totalGames() {
    const { wins, draws, loses } = this._teamResults;
    return wins + draws + loses;
  }

  get totalVictories() {
    return this._teamResults.wins;
  }

  get totalDraws() {
    return this._teamResults.draws;
  }

  get totalLosses() {
    return this._teamResults.loses;
  }

  get goalsHome() {
    return this._goalsHome;
  }

  get goalsAway() {
    return this._goalsAway;
  }

  get goalsBalance() {
    return this._goalsHome - this.goalsAway;
  }

  get efficiency(): number {
    const efficiency = Number(
      ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2),
    );
    return efficiency;
  }

  get board() {
    this._board = {
      name: this._teamName,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsHome,
      goalsOwn: this.goalsAway,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };

    return this._board;
  }
}

export default LeaderBoardStats;
