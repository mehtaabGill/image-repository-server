import { Image } from '../types/images';
import { loadAllImages } from '../helpers/database';
import { Request, Response } from 'express';

/**
 * sends the respective image for the fileName provided
 * @param req Request
 * @param res Response
 */
export function sendImageByName (req: Request, res: Response) {
    const allImages = loadAllImages();
    
    const requestedImage = allImages.find((image: Image) => image.fileName === req.params.imageName);
    
    if(requestedImage) {
        res.sendFile(requestedImage.filePath);
    } else {
        res.status(404).end();
    }
}