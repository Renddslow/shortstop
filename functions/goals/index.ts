import { Handler } from '@netlify/functions';

import getKeyFromPath from '../utils/getKeyFromPath';
import get from './get';

const handler: Handler = async (event, context) => {
  const [err, personID] = getKeyFromPath('/api/people/:personID/goals', event.path, 'personID');

  const methods = {
    GET: get(personID),
    POST: () => {},
  };

  return methods[event.httpMethod](event);
};

export { handler };
