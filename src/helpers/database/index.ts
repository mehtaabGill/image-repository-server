import { IImage } from "../../types/images";
import Image from '../../schemas/Image';
import fs from 'fs';
import path from 'path';
import { UploadedFile } from "express-fileupload";
import getAppDataPath from 'appdata-path';
import initializeDatabase from "./etc";

const mainAppDataPath = path.join(getAppDataPath(), 'image-repository-server');
const imageFolder = path.join(mainAppDataPath, 'images');

initializeDatabase();

export default class DatabaseManager {

    /**
    * Load the images and return all in an array
    * @returns array of image objects
    */
    static async loadAllImages(): Promise<IImage[]> {
        return await Image.find();
    }

    /**
     * Handles all aspects of adding a new image to the database.
     * @param file uploaded image
     * @param recognizedText text contained in the image
     * @param tags tags of the image
     * @param writeToFile wether to write the image to the disk or not
     * @returns IImage object of the new image
     */
    static async addImage(file: UploadedFile, recognizedText: string[], tags: string[], writeToFile: boolean = true) {
        
        const allImages = await this.loadAllImages();
        
        if(allImages.find(image => image.md5Hash === file.md5)) {
            return;
        }

        const image: IImage = await Image.create({
            md5Hash: file.md5,
            fileName: `${file.md5}.${file.mimetype === 'image/png' ? 'png' : 'jpg'}`,
            filePath: path.join(imageFolder, `${file.md5}.${file.mimetype === 'image/png' ? 'png' : 'jpg'}`),
            recognizedText: recognizedText.join(' '),
            tags: tags.join(' ')
        })
    
        if (writeToFile) {
            fs.writeFile(image.filePath, file.data, () => {});
        }

        return image;
    }

    /**
     * Retrieve image array based on a specified substring
     * @param search the substring to search for
     * @returns Array of Images which relate to the substring
     */
    static async getImagesByQuery(search: string): Promise<IImage[]> {
        return Image.find({ $text: { $search: search } });
    }

    /**
     * Fetch specific image by file name
     * @param fileName file name of the image to be retrieved
     */
    static async getImageByFileName(fileName: string) {
        return Image.findOne({ fileName });
    }
}