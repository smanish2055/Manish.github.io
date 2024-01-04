// sequelize-config.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('todos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
