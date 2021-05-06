import { Image } from "../../types/images";
import fs from 'fs';
import path from 'path';

const DBPath = path.join(__dirname, '..', '..', 'mock-data', 'db.json');

/**
 * Load the images and return all in an array
 * @returns array of image objects
 */
export function loadAllImages(): Image[] {
    return JSON.parse(fs.readFileSync(DBPath, 'utf-8'));
}