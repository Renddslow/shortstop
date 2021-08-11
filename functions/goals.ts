import { query, Client } from 'faunadb';
import { Handler } from '@netlify/functions';

import getKeyFromPath from './utils/getKeyFromPath';
import { Response } from './utils/type';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const handler: Handler = async (event, context) => {
  const [err, personID] = getKeyFromPath('', event.path, 'personID');

  const goals = (await client.query(
    q.Map(q.Paginate(q.Match(q.Index('goalOwner'), personID)), q.Lambda('x', q.Get(q.Var('x')))),
  )) as { data: Response[] };

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: goals.data.map(({ ref, data }) => ({
        type: 'goal',
        id: ref.toJSON()['@ref'].id,
        attributes: data,
      })),
    }),
  };
};

export { handler };
