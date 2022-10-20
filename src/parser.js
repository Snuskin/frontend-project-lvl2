import { readFileSync } from 'fs';

const getContent = (file) => {
    const fileData = readFileSync(file, 'utf8');
    const fileDataParsed = JSON.parse(fileData);
    return fileDataParsed;
};

export default getContent
