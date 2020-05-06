import fs from 'fs';

const genDiff = (path1, path2) => {
  const dataFromFile1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const dataFromFile2 = JSON.parse(fs.readFileSync(path2, 'utf8'));

  const entries1 = Object.entries(dataFromFile1);
  const entries2 = Object.entries(dataFromFile2);

  const changes = {
    added: [],
    removed: [],
    changed: [],
    unchanged: [],
  };

  entries1.forEach(([key, value]) => {
    const value2 = dataFromFile2[key];
    const hasProperty = Object.prototype.hasOwnProperty.call(dataFromFile2, key);
    if (hasProperty) {
      if (value === value2) {
        changes.unchanged.push([key, value]);
      }

      if (value !== value2) {
        changes.changed.push([key, value, value2]);
      }
    } else {
      changes.removed.push([key, value]);
    }
  });

  entries2.forEach(([key2, value2]) => {
    const hasProperty = Object.prototype.hasOwnProperty.call(dataFromFile1, key2);
    if (!hasProperty) {
      changes.added.push([key2, value2]);
    }
  });

  const res = [
    ...changes.added.map(([key, value]) => `+${key}: ${value}`),
    ...changes.removed.map(([key, value]) => `${key}: ${value}`),
    ...changes.changed.map(([key, oldValue, newvalue]) => `-${key}: ${oldValue} +${key}: ${newvalue}`),
    ...changes.unchanged.map(([key, value]) => `${key}: ${value}`),
  ].join('\n');
  console.log(res);

  return [
    ...changes.added.map(([key, value]) => `+${key}: ${value}`),
    ...changes.removed.map(([key, value]) => `${key}: ${value}`),
    ...changes.changed.map(([key, oldValue, newvalue]) => `-${key}: ${oldValue} +${key}: ${newvalue}`),
    ...changes.unchanged.map(([key, value]) => `${key}: ${value}`),
  ].join('\n');
};

export default genDiff;
