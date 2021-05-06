import apiRouter from './api';
import imageRouter from './images';

import { RouterConfig } from '../types/internals';

const routerData: RouterConfig[] = [{ path: '/api', router: apiRouter }, { path: '/images', router: imageRouter }];

export default routerData;