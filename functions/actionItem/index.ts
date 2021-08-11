import { Handler } from '@netlify/functions';

import getKeyFromPath from '../utils/getKeyFromPath';
import archive from './archive';
import patch from './patch';

const handler: Handler = async (event, context) => {
  const [err, itemID] = getKeyFromPath('/api/action-items/:itemID', event.path, 'itemID');

  const methods = {
    PATCH: patch(itemID),
    DELETE: archive(itemID),
  };

  return methods[event.httpMethod](event);
};

export { handler };
