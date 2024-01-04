import { sequelize } from './config/sequelize-config';
import './models/todoModel'; // Adjust the path based on your project structure

// Sync the model with the database
(async () => {
  try {
    await sequelize.sync({ force: true }); // Use force: true to recreate tables (be careful with this in production)
    console.log('Database synchronized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
})();
