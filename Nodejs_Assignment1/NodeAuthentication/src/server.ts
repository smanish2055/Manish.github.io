import express, { Request, Response } from 'express';
import config from "./config/config";
const app = express();

const port =config.serverPort;

const authRouter = require('./routes/authRouter');
const todoRoutes = require('./routes/todosRouter');


app.use(express.json());

app.use('/api/v1/users',authRouter);


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});