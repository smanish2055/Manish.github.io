// app.ts

import express , {Request,Response,NextFunction}from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes/todoRouter';
import errorHandler from './middleware/error';

const app = express();
const port = process.env.PORT || 8000;


app.use(bodyParser.json());

app.use('/api', todoRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error(`Can't find ${req.originalUrl} on server 😕`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

// Apply the error handling middleware
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
