import { loadAllImages } from '../helpers/database';
import { Request, Response } from 'express';
import { Image } from '../types/images';

/**
 * API call to retrieve all image names
 * @param req Request
 * @param res Response
 */
export function sendAllImageNames (req: Request, res: Response) {
    res.json(loadAllImages().map((image: Image) => image.fileName));
}