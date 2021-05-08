import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import setupMiddleware from './helpers/app/setupMiddleware';
import setupRouters from './helpers/app/setupRouters';

const app = express();

setupMiddleware(app);
setupRouters(app);

export default app;