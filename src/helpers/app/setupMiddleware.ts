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
    if(process.env.NODE_ENV !== 'TESTING')
        app.use(morgan(':method :url :status - :response-time ms'))
}