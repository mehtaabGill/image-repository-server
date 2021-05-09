import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';

import app from '../app';

test('Health check responds with 200 status and json', async done => {
    for(let i = 0; i < 10; i++) {
        const response = await request(app).get('/api/health-check');

        if(response.statusCode === 200 && response.headers['content-type'].indexOf('json') !== -1) {
            done();
        } else {
            await new Promise((resolve: Function, reject: Function) => setTimeout(resolve, 500));
        }
    }

    throw new Error('Failed health check after 10 retries');
})