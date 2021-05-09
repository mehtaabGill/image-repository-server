import DatabaseClient from '../helpers/database';
import Rekognition from '../helpers/RekognitionClient'; 
import { Request, Response } from 'express';
import { IImage } from '../types/images';
import mongoose from 'mongoose';

const safeMIMETypes = ['image/png', 'image/jpeg']

/**
 * API call to retrieve all image names
 * @param req Request
 * @param res Response
 */
export async function sendAllImageNames (req: Request, res: Response) {
    res.json((await DatabaseClient.loadAllImages()).map((image: IImage) => image.fileName));
}

/**
 * API call to add a new image to the database
 * @param req Request
 * @param res Response
 */
export async function addNewImage (req: Request, res: Response) {
    
    if(process.env.DISABLE_IMAGE_UPLOAD === 'true') {
        return res.status(400).json({errors: ['Image uploading has been disabled on this instance of this application']});
    }

    if(!req.files?.image) {
        return res.status(400).json({errors: ['"image" file missing from body']});
    } else if(Array.isArray(req.files.image)) {
        return res.status(400).json({errors: ['"image" object must not be an array']});
    } else if(!safeMIMETypes.includes(req.files.image.mimetype)) {
        return res.status(400).json({errors: [`"image" mime type must be one of the following: ${JSON.stringify(safeMIMETypes)}`]});
    }
    
    const uploadedImage = req.files.image;

    const [labels, text] = await Promise.all([Rekognition.getImageLabels(uploadedImage.data), Rekognition.getImageText(uploadedImage.data)])

    const newImage = await DatabaseClient.addImage(uploadedImage, text, labels);

    res.status(200).json({ success: true, imageName: newImage?.fileName });
}

/**
 * API Call to get a list of images based off a specific search
 * @param req Request
 * @param res Response
 */
export async function getImagesBySearch(req: Request, res: Response) {
    if(!req.query.search || typeof req.query.search !== 'string') return res.status(400).json({ errors: ['invalid "search" query parameter'] });
    res.json((await DatabaseClient.getImagesByQuery(req.query.search)).map(image => image.fileName));
}

/**
 * Simple health check API call
 * @param req Request
 * @param res Response
 */
 export async function healthCheck(req: Request, res: Response) {
    const isConnectedToDB = mongoose.connection.readyState === 1;
    const responseStatus = isConnectedToDB ? 200 : 500;

    res.status(responseStatus).json({
        isConnectedToDB,
        uptime: process.uptime(),
        cpuUsage: process.cpuUsage()
    })
}