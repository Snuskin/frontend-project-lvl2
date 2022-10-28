import stylish from './stylish.js'
import plain from './plain.js'
import json from './JSON.js';

export default (data, format) => {
    switch (format) {
        case 'stylish':
            return stylish(data);
        case 'plain':
            return plain (data);
        case 'json':
            return json(data);
        default:
            throw new Error(`Invalid file format type: '.${format}'! Try supported file formats.`)
    }
}
