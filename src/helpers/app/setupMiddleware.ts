import { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export default function(app: Express) {
    //helmet for basic security
    app.use(helmet());
    //morgan for logging
    app.use(morgan(':method :url :status - :response-time ms'))
}