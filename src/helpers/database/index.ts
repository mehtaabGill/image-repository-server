import { Image } from "../../types/images";
import fs from 'fs';
import path from 'path';
import { UploadedFile } from "express-fileupload";
import getAppDataPath from 'appdata-path';

const mainAppDataPath = path.join(getAppDataPath(), 'image-repository-server');

const DBPath = path.join(mainAppDataPath, 'db.json');
const imageFolder = path.join(mainAppDataPath, 'images');

/**
 * Load the images and return all in an array
 * @returns array of image objects
 */
export function loadAllImages(): Image[] {
    return JSON.parse(fs.readFileSync(DBPath, 'utf-8'));
}

export function addImage(file: UploadedFile, recognizedText: string[], tags: string[], writeToFile: boolean = true) {
    const image: Image = {
        md5Hash: file.md5,
        fileName: `${file.md5}.${file.mimetype === 'image/png' ? 'png' : 'jpg'}`,
        filePath: path.join(imageFolder, `${file.md5}.${file.mimetype === 'image/png' ? 'png' : 'jpg'}`),
        recognizedText,
        tags
    }

    if(writeToFile) {
        fs.writeFileSync(image.filePath, file.data);
    }

    addToDB(image);
}

function addToDB(image: Image) {
    const allImages = loadAllImages();
    allImages.push(image);
    fs.writeFileSync(DBPath, JSON.stringify(allImages));
}

function ensurePaths() {
    if(!fs.existsSync(mainAppDataPath)) fs.mkdirSync(mainAppDataPath);
    if(!fs.existsSync(DBPath)) fs.writeFileSync(DBPath, '[]');
    if(!fs.existsSync(imageFolder)) fs.mkdirSync(imageFolder);
}

ensurePaths()