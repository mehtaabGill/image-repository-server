import { InvalidRekognitionCredentials, RekognitionError } from "./errors";

import AWS from 'aws-sdk';

class RekognitionClient {

    private rekognition: AWS.Rekognition;

    constructor(accessKeyId: string, secretAccessKey: string, region: string) {
        AWS.config.update({
            accessKeyId,
            secretAccessKey,
            region
        })

        this.rekognition = new AWS.Rekognition({ region });
    }

    /**
     * Generates an array of tags base on the specified image
     * @param imageBytes Bytes of image to be used
     * @returns string array of tags
     */
    public async getImageLabels(imageBytes: Buffer): Promise<string[]> {
        const imageSummary = await this.rekognition.detectLabels({Image: {Bytes: imageBytes}, MinConfidence: 70}).promise();
        if(!imageSummary.Labels) throw new RekognitionError('Error during image rekognition');
        return this.extractImageLabels(imageSummary.Labels);
    }

    private extractImageLabels(Labels: AWS.Rekognition.Labels): string[] {
        return Labels.map(label => label.Name?.toLowerCase()).filter(label => label !== undefined) as string[];
    }

    public async getImageText(imageBytes: Buffer): Promise<string[]> {
        return new Promise(((resolve: Function, reject: Function) => {
            this.rekognition.detectText({Image: {Bytes: imageBytes}}, (error, data) => {
                if(error) reject(new RekognitionError(error.message));
                else if(!data.TextDetections) resolve([]);
                else resolve(this.extractImageText(data.TextDetections));
            })
        }).bind(this))
    }

    private extractImageText(TextDetections: AWS.Rekognition.TextDetectionList): string[] {
        const confidentWords = TextDetections?.filter(detection => detection.Confidence && detection.Confidence > 70 && detection.Type === 'WORD');
        return confidentWords.map(detection => detection.DetectedText?.toLowerCase()) as string[];
    }
}

if(!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_DEFAULT_REGION) {
    throw new InvalidRekognitionCredentials("AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY or AWS_DEFAULT_REGION missing from process environment");
}

export default new RekognitionClient(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_DEFAULT_REGION);