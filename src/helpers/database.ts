import { Image } from "../types/images";
import fs from 'fs';
import path from 'path';

const DBPath = path.join(__dirname, '..', '..', 'mock-data', 'db.json');

/**
 * Returns string array containing the filer path of all images
 * @returns string array of file paths
 */
 export function readAllImageNames(): string[] {
    return loadAllImages().map((image: Image) => image.fileName);
}

/**
 * Load the images and return all in an array
 * @returns array of image objects
 */
export function loadAllImages(): Image[] {
    return JSON.parse(fs.readFileSync(DBPath, 'utf-8'));
}