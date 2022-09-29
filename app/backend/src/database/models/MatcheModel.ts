import { Model, INTEGER } from 'sequelize';
import db from '.';
// import TeamModel from './TeamModel';

class MatcheModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

MatcheModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    homeTeam: {
      type: INTEGER,
    },
    homeTeamGoals: {
      type: INTEGER,
    },
    awayTeam: {
      type: INTEGER,
    },
    awayTeamGoals: {
      type: INTEGER,
    },
    inProgress: {
      type: INTEGER,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

// MatcheModel.belongsTo(TeamModel, { foreignKey: 'id' });

export default MatcheModel;
