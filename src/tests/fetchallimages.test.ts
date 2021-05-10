import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';

import app from '../app';
import initializeDatabase from '../helpers/database/etc';

beforeEach(async done => {
    await initializeDatabase();
    done();
})

test('/api/fetch-all-images responds with 200 status and json', async done => {
    const response = await request(app).get('/api/fetch-all-images');

    if (response.statusCode === 200 && response.headers['content-type'].indexOf('json') !== -1) {
        return done();
    } else {
        await new Promise((resolve: Function, reject: Function) => setTimeout(resolve, 500));
    }

    throw new Error('Failed /api/fetch-all-images after 10 retries');
})