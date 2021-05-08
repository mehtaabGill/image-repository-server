import DatabaseClient from '../helpers/database';
import Rekognition from '../helpers/RekognitionClient'; 
import { Request, Response } from 'express';
import { Image } from '../types/images';

const safeMIMETypes = ['image/png', 'image/jpeg']

/**
 * API call to retrieve all image names
 * @param req Request
 * @param res Response
 */
export function sendAllImageNames (req: Request, res: Response) {
    res.json(DatabaseClient.loadAllImages().map((image: Image) => image.fileName));
}

/**
 * API call to add a new image to the database
 * @param req Request
 * @param res Response
 */
export async function addNewImage (req: Request, res: Response) {
    if(!req.files?.image) {
        return res.status(400).json({errors: ['"image" file missing from body']});
    } else if(Array.isArray(req.files.image)) {
        return res.status(400).json({errors: ['"image" object must not be an array']});
    } else if(!safeMIMETypes.includes(req.files.image.mimetype)) {
        return res.status(400).json({errors: [`"image" mime type must be one of the following: ${JSON.stringify(safeMIMETypes)}`]});
    }
    
    const uploadedImage = req.files.image;

    const labels = await Rekognition.getImageLabels(uploadedImage.data);
    const text = await Rekognition.getImageText(uploadedImage.data);

    DatabaseClient.addImage(uploadedImage, text, labels)

    res.status(200).json({success: true})
}