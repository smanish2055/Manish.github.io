/* --------------------------------- Imports -------------------------------- */
import express, { Express } from "express";
import config from "./configs/index";
import routes from "./routes/Index";
import errorHandler from "./middlewares/ErrorHandler";
import pathNotFound from "./middlewares/PathNotFound";
import sequelize from "./configs/DbConfig";
/* -------------------------- Server initialization ------------------------- */
const app: Express = express();
const PORT = config.serverPort;

/* ------------------------------- Middlewares ------------------------------ */
// Middleware to parse request body
app.use(express.json());
// Middleware to parse url encoded request body
app.use(express.urlencoded({ extended: false }));

// Middleware to handle routes
app.use(routes);
// Middleware to handle 404 routes responses
app.use(pathNotFound);
// Middleware to handle errors
app.use(errorHandler);
/* --------------------------- Running the server --------------------------- */
// Sync the models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Table and model synced successfully");
  })
  .catch((err: any) => {
    console.error("Error syncing models:", err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
