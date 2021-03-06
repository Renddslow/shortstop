import { Handler } from '@netlify/functions';
import { query, Client } from 'faunadb';

import getKeyFromPath from './utils/getKeyFromPath';
import matchPeople, { Person } from './utils/matchPeople';
import getAllPeople from './utils/getAllPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const handler: Handler = async (event, context) => {
  const [err, personID] = getKeyFromPath('/api/people/:personID', event.path, 'personID');

  const person = (await client.query(q.Get(q.Match(q.Index('personID'), personID)))) as Record<
    string,
    any
  >;

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: {
        type: 'person',
        id: personID,
        attributes: matchPeople(person.data, await getAllPeople(client)),
      },
    }),
  };
};

export { handler };
