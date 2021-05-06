import { Express } from 'express';
import helmet from 'helmet';

export default function(app: Express) {
    //helmet for basic security
    app.use(helmet());
}