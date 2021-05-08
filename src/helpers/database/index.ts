import { Image } from "../../types/images";
import fs from 'fs';
import path from 'path';
import { UploadedFile } from "express-fileupload";
import getAppDataPath from 'appdata-path';

const mainAppDataPath = path.join(getAppDataPath(), 'image-repository-server');

const DBPath = path.join(mainAppDataPath, 'db.json');
const imageFolder = path.join(mainAppDataPath, 'images');

/**
 * Ensures that the paths/files required for this app exist
 */
function ensurePaths() {
    if (!fs.existsSync(mainAppDataPath)) fs.mkdirSync(mainAppDataPath);
    if (!fs.existsSync(DBPath)) fs.writeFileSync(DBPath, '[]');
    if (!fs.existsSync(imageFolder)) fs.mkdirSync(imageFolder);
}

ensurePaths()

export default class DatabaseManager {

    /**
    * Load the images and return all in an array
    * @returns array of image objects
    */
    static loadAllImages(): Image[] {
        return JSON.parse(fs.readFileSync(DBPath, 'utf-8'));
    }

    /**
     * Handles all aspects of adding a new image to the database.
     * @param file uploaded image
     * @param recognizedText text contained in the image
     * @param tags tags of the image
     * @param writeToFile wether to write the image to the disk or not
     */
    static addImage(file: UploadedFile, recognizedText: string[], tags: string[], writeToFile: boolean = true) {
        const image: Image = {
            md5Hash: file.md5,
            fileName: `${file.md5}.${file.mimetype === 'image/png' ? 'png' : 'jpg'}`,
            filePath: path.join(imageFolder, `${file.md5}.${file.mimetype === 'image/png' ? 'png' : 'jpg'}`),
            recognizedText: recognizedText.join(' '),
            tags: tags.join(' ')
        }
    
        if (writeToFile) {
            fs.writeFileSync(image.filePath, file.data);
        }
    
        this.addToDB(image);
    }

    /**
     * Adds the image data to the database
     * @param image the image to add
     */
    static addToDB(image: Image) {
        const allImages = this.loadAllImages();
        allImages.push(image);
        fs.writeFileSync(DBPath, JSON.stringify(allImages));
    }
}