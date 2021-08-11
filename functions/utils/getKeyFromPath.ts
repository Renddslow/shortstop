import { parse } from 'regexparam';

const exec = (path, result): Record<string, any> => {
  let i = 0,
    out = {};
  let matches = result.pattern.exec(path);
  while (i < result.keys.length) {
    out[result.keys[i]] = matches[++i] || null;
  }
  return out;
};

const getKeyFromPath = (pattern: string, path: string, key: string) => {
  const route = parse(pattern);
  const p = exec(path, route);

  if (!p[key]) {
    return [''];
  }

  return [null, p[key]];
};

export default getKeyFromPath;
