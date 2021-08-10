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

const getPersonIDFromPath = (pattern: string, path: string) => {
  const route = parse(pattern);
  const p = exec(path, route);

  if (!p.personID) {
    return [''];
  }

  return [null, p.personID];
};

export default getPersonIDFromPath;
