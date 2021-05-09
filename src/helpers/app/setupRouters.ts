import { Express } from 'express';

import apiRouter from '../../routers/api';
import imageRouter from '../../routers/images';

/**
 * Configures the routers for the express app provided
 * @param app app to setup the routers for
 */
export default function setupRouters(app: Express) {
    app.use('/api', apiRouter);
    app.use('/images', imageRouter);
}