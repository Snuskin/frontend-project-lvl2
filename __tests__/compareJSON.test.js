import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFile, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fitxtureFilePath = getFixturePath('compareJSON.txt');
const expectedResult = readFileSync(fitxtureFilePath, 'utf8')
test('genDiff', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedResult);
  });