import { Image } from '../types/images';
import { loadAllImages } from './database';

/**
 * Returns string array containing the filer path of all images
 * @returns string array of file paths
 */
export function readAllImageNames(): string[] {
    return loadAllImages().map((image: Image) => image.fileName);
}