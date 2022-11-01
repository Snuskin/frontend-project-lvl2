import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return _.isString(data) ? `'${data}'` : data;
};

const plain = (diff) => {
  const iter = (tree, parent) => tree.flatMap((node) => {
    const path = [...parent, node.key].join('.');

    switch (node.state) {
      case 'added':
        return `Property '${path}' was added with value: ${stringify(node.afterValue)}`;
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'notChanged':
        return [];
      case 'changed':
        return `Property '${path}' was updated. From ${stringify(node.beforeValue)} to ${stringify(node.afterValue)}`;
      case 'nested':
        return `${iter(node.children, [path]).join('\n')}`;
      default:
        throw new Error(`Type ${node.state} is undefined`);
    }
  });

  const plainDiff = iter(diff, []);

  return [...plainDiff].join('\n');
};

export default plain;
