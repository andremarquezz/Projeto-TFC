import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

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
      field: 'team_name',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Team',
    timestamps: false,
  },
);

export default TeamModel;
