import { IImage } from '../types/images';
import { Schema, model, Model} from 'mongoose';

/*
 * Create schema to represent the Image
 */
const ImageSchema = new Schema({
    md5Hash: { type: String, required: true },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
    recognizedText: { type: String, default: '' },
    tags: { type: String, default: '' }
}, { collection: 'images' });

//Used for search indexing in mongoDB
ImageSchema.index({ recognizedText: 'text', tags: 'text' });

//create the official Model
const Image: Model<IImage> = model('Image', ImageSchema);

export default Image;