import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from '../models'

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? "3000";

app.get('/', (req: Request, res: Response) => {
    res.send('Server is started');
});

db.sequelize.sync({ alter: process.env.NODE_ENV === "development" }).then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})