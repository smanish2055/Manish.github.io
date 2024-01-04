import { sequelize } from '../config/sequelize-config';
import { DataTypes } from 'sequelize';

export const Todo  = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  freezeTableName: true,
  timestamps: false,
}
);


