import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './api/routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send('Server is started');
});

app.use('/api/v1', routes);

try {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
} catch (err) {
    console.log(`Error occured : ${err}`);
}