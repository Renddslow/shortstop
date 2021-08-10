import { Handler } from '@netlify/functions';

import getPersonIDFromPath from '../utils/getPersonIDFromPath';
import get from './get';
import create from './create';

const handler: Handler = async (event, context) => {
  const [err, personID] = getPersonIDFromPath('/api/people/:personID/agenda', event.path);

  const methods = {
    POST: create(personID),
    GET: get(personID),
    DELETE: () => {},
    PATCH: () => {},
  };

  return methods[event.httpMethod](event);
};

export { handler };
