import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import MatcheModel from './MatcheModel';

class TeamModel extends Model {
  id!: number;
  teamName!: string;
}

TeamModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'User',
    timestamps: false,
  },
);

// TeamModel.hasMany(MatcheModel, { foreignKey: 'id' });

export default TeamModel;
