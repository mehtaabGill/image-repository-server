export interface Image {
    id:             number;
    md5Hash:        string;
    filePath:       string;
    fileName:       string;
    recognizedText: string[];
    tags:           string[];
    specs:          Specs;
}

export interface Specs {
    format: string;
    width:  number;
    height: number;
}