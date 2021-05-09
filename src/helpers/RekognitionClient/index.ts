import { InvalidComputerVisionCredentials, RekognitionError } from "./errors";

import AWS from 'aws-sdk';

class ComputerVision {

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
        return <string[]>imageSummary.Labels.map(label => label.Name?.toLowerCase()).filter(label => label !== undefined);
    }

    public async getImageText(imageBytes: Buffer): Promise<string[]> {
        return new Promise(((resolve: Function, reject: Function) => {
            this.rekognition.detectText({Image: {Bytes: imageBytes}}, (error, data) => {
                if(error) reject(new RekognitionError(error.message));
                else resolve(data.TextDetections?.filter(detection => detection.Confidence && detection.Confidence > 70 && detection.Type === 'WORD').map(detection => detection.DetectedText?.toLowerCase()));
            })
        }).bind(this))
    }
}

if(!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_DEFAULT_REGION) {
    throw new InvalidComputerVisionCredentials("AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY or AWS_DEFAULT_REGION missing from process environment");
}

export default new ComputerVision(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_DEFAULT_REGION);