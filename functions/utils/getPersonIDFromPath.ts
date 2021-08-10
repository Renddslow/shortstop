const getPersonIDFromPath = (path: string) => {
  const p = /\/([a-zA-Z]+)$/.exec(path);

  if (!p) {
    return [''];
  }

  const [, personID] = p;
  return [null, personID];
};

export default getPersonIDFromPath;
