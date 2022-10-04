export default interface IUpdateGoals {
  id: string;
  goals: {
    homeTeamGoals: number;
    awayTeamGoals: number;
  };
}
