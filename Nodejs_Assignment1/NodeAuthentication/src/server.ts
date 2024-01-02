import express from 'express';
import config from "./config/config";
const app = express();

const port =config.serverPort;

const authRouter = require('./routes/authRouter');



app.use(express.json());

app.use('/api/v1/users',authRouter);


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});