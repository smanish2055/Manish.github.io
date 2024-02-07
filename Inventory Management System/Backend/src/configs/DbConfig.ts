import config from "./index";
const db = config.database;
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: db.host,
  username: db.user,
  password: db.password,
  database: db.database,
  logging: false, //it restrict to logging unwanted data in console
});

// Test the database connection

// authenticate function retune promises so that is promise resolved when the database is connected  and rejected when the database is not connected
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
