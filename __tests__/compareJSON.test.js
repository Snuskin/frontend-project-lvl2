import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fitxtureJSONFilePath = getFixturePath('compareJSON.txt');
const expectedJSONResult = readFileSync(fitxtureJSONFilePath, 'utf8');
const fitxtureYAMLFilePath = getFixturePath('compareYAML.txt');
const expectedYAMLResult = readFileSync(fitxtureYAMLFilePath, 'utf8');
test('genDiff', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedJSONResult);
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectedYAMLResult);
  });