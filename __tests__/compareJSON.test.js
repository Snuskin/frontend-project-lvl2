import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync((getFixturePath(filename)), 'utf8');

const expectedStylish = readFile('compareStylish.txt');
const expectedPlain = readFile('comparePlain.txt');
const expectedJson = readFile('compareJSON.txt');

const extensions = ['json', 'yaml', 'yml'];

describe('Positives cases', () => {
  test.each(extensions)('Format %s', (extension) => {
    const file1 = `${process.cwd()}/__fixtures__/file1.${extension}`;
    const file2 = `${process.cwd()}/__fixtures__/file2.${extension}`;

    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
  });
});

describe('Negative cases', () => {
  test('Check wrong file extension', () => {
    const error = new Error('Unexpected file extension: txt! Supported formats: \'yaml/yml\', \'json\'');

    expect(() => {
      genDiff(getFixturePath('file1-wrong.txt'), getFixturePath('file2-wrong.txt'));
    }).toThrow(error);
  });
});
