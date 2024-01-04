import { sequelize } from '../config/sequelize-config';
import { DataTypes } from 'sequelize';

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Todo;
