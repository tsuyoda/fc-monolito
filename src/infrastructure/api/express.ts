import express from 'express';
import { clientRouter } from '../../interfaces/http/routes/client.route';

export const app = express();

app.use(express.json());

app.use('/client', clientRouter);
