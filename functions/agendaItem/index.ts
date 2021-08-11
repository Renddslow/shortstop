import { Handler } from '@netlify/functions';

import getKeyFromPath from '../utils/getKeyFromPath';
import archive from './archive';
import patch from './patch';

const handler: Handler = async (event, context) => {
  const [err, personID] = getKeyFromPath('/api/agenda-items/:itemID', event.path, 'itemID');

  const methods = {
    PATCH: patch(personID),
    DELETE: archive(personID),
  };

  return methods[event.httpMethod](event);
};

export { handler };
