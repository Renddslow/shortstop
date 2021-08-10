import { query, Client } from 'faunadb';
import { Handler } from '@netlify/functions';

import getPersonIDFromPath from './utils/getPersonIDFromPath';
import { Response } from './utils/type';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const handler: Handler = async (event, context) => {
  const [err, personID] = getPersonIDFromPath(event.path);

  const goals = (await client.query(
    q.Map(q.Paginate(q.Match(q.Index('rockOwner'), personID)), q.Lambda('x', q.Get(q.Var('x')))),
  )) as { data: Response[] };

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: goals.data.map(({ ref, data }) => ({
        type: 'rock',
        id: ref.toJSON()['@ref'].id,
        attributes: data,
      })),
    }),
  };
};

export { handler };
