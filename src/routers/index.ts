import apiRouter from './api';
import { RouterConfig } from '../types/internals';

const routerData: RouterConfig[] = [{ path: '/api', router: apiRouter }];

export default routerData;