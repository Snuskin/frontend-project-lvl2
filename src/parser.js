import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const getAbsolutePath = (file) => path.resolve(process.cwd(), file);
const getFileExtname = (file) => path.extname(file).slice(1);

const getContent = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unexpected file extension: ${extension}! Supported formats: 'yaml/yml', 'json'`);
  }
};

const getFileInfo = (file) => {
  const absolutePath = getAbsolutePath(file);
  const fileExtname = getFileExtname(file);
  const fileData = readFileSync(absolutePath, 'utf8');
  return getContent(fileData, fileExtname);
};

export default getFileInfo;
