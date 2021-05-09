import { connect } from 'mongoose';
import { DatabaseClientError } from './errors';

import fs from 'fs';
import path from 'path';
import getAppDataPath from 'appdata-path';

const mainAppDataPath = path.join(getAppDataPath(), 'image-repository-server');
const imageFolder = path.join(mainAppDataPath, 'images');

/*
 * Function to connect to database
 */
async function connectToDB() {
    if(!process.env.DATABASE_URL) {
        throw new DatabaseClientError('Missing DATABASE_URL from process environment');
    }

    await connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    
    console.info('Connected to database instance');
}

/**
 * Ensures that the paths/files required for this app exist
 */
 function ensurePaths() {
    if (!fs.existsSync(mainAppDataPath)) fs.mkdirSync(mainAppDataPath);
    if (!fs.existsSync(imageFolder)) fs.mkdirSync(imageFolder);
}

export default async function initializeDatabase() {
    ensurePaths();
    await connectToDB();
}