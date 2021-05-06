import { Express } from 'express';
import helmet from 'helmet';

export default function(app: Express) {
    app.use(helmet());
}