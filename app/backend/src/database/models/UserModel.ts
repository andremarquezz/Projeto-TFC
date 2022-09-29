import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
}

UserModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    role: {
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
export default UserModel;
