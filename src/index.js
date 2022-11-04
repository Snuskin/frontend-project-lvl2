import path from 'path';
import { readFileSync } from 'fs';
import getContent from './parser.js';
import buildTree from './buildTree.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(process.cwd(), file);
const getFileExtname = (file) => path.extname(file).slice(1);

const getFileInfo = (file) => {
  const absolutePath = getAbsolutePath(file);
  const fileExtname = getFileExtname(file);
  const fileData = readFileSync(absolutePath, 'utf8');
  return getContent(fileData, fileExtname);
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1DataParsed = getFileInfo(filePath1);
  const file2DataParsed = getFileInfo(filePath2);
  const unformedTree = buildTree(file1DataParsed, file2DataParsed);

  return formatter(unformedTree, format);
};

export default genDiff;
