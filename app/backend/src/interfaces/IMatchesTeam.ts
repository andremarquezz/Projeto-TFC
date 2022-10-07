import TeamModel from '../database/models/TeamModel';

export type Matches = {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
};

export default interface IMatchesTeam extends TeamModel{
  teamName: string;
  homeMatches: Matches[];
}
