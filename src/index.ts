import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

import express from 'express';
import setupMiddleware from './helpers/setupMiddleware';

const app = express();

setupMiddleware(app);

app.listen(PORT, () => { console.log(`app listening at http://127.0.0.1:${PORT}`) })