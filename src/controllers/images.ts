import { Image } from '../types/images';
import { loadAllImages } from './database';
import { Request, Response } from 'express';

/**
 * Returns string array containing the filer path of all images
 * @returns string array of file paths
 */
export function readAllImageNames(): string[] {
    return loadAllImages().map((image: Image) => image.fileName);
}

export function sendImageByName (req: Request, res: Response) {
    const allImages = loadAllImages();
    
    const requestedImage = allImages.find((image: Image) => image.fileName === req.params.imageName);
    
    if(requestedImage) {
        res.sendFile(requestedImage.filePath);
    } else {
        res.status(404).end();
    }
}