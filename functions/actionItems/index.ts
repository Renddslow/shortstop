import { Handler } from '@netlify/functions';

import getKeyFromPath from '../utils/getKeyFromPath';
import get from './get';
import create from './create';

const handler: Handler = async (event, context) => {
  const [err, personID] = getKeyFromPath('/api/people/:personID/actions', event.path, 'personID');

  const methods = {
    POST: create(personID),
    GET: get(personID),
  };

  return methods[event.httpMethod](event);
};

export { handler };
