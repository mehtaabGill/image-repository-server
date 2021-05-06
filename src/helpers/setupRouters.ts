import { Express } from 'express';

import routerData from '../routers';
import { RouterConfig } from '../types/internals';

/**
 * Configures the routers for the express app provided
 * @param app app to setup the routers for
 */
export default function setupRouters(app: Express) {
    routerData.forEach((routerConfig: RouterConfig) => {
        app.use(routerConfig.path, routerConfig.router)
    })
}