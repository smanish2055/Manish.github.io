// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes/todoRouter';

const app = express();
const port = process.env.PORT || 8000;


app.use(bodyParser.json());

app.use('/api', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
