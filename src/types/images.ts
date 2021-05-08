import { Document } from 'mongoose';

export interface IImage extends Document {
    md5Hash:        string;
    filePath:       string;
    fileName:       string;
    recognizedText: string;
    tags:           string;
}