import { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

export default function(app: Express) {
    //helmet for basic security
    app.use(helmet({
        crossOriginResourcePolicy: false
    }));
    //cors for allowing resource sharing
    app.use(cors({
        origin: '*'
    }))
    //morgan for logging
    app.use(morgan(':method :url :status - :response-time ms'))
}