import DatabaseClient from '../helpers/database';
import { Request, Response } from 'express';

/**
 * sends the respective image for the fileName provided
 * @param req Request
 * @param res Response
 */
 export async function sendImageByName (req: Request, res: Response) {
    // NOTE: include the reason for failure here
    if(!req.params.imageName) {
        return res.status(400).json({ errors: ['request is missing "imageName"'] })
    }

    const requestedImage = await DatabaseClient.getImageByFileName(req.params.imageName);

    if(requestedImage) {
        res.sendFile(requestedImage.filePath);
    } else {
        res.status(404).end();
    }
}