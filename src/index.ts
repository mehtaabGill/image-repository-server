import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

import express from 'express';
import setupMiddleware from './helpers/app/setupMiddleware';
import setupRouters from './helpers/app/setupRouters';

const app = express();

setupMiddleware(app);
setupRouters(app);

app.listen(PORT, () => { console.log(`app listening at http://127.0.0.1:${PORT}`) })