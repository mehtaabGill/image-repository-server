import { connect, connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

test('Successfully connects to the database', async (done) => {
    try {
        if(!process.env.DATABASE_URL) {
            throw new Error('Missing DATABASE_URL from process environment');
        }
    
        await connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    
        done();   
    } catch (err) {
        done(err);
    }
})

afterAll(done => {
    connection.close();
    done();
})