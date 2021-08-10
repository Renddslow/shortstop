import { Handler } from '@netlify/functions';
import { query, Client } from 'faunadb';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const handler: Handler = async (event, context) => {
  const path = /\/([a-zA-Z]+)$/.exec(event.path);

  if (!path) {
    // error
  }

  const [, personID] = path;

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
        attributes: person.data,
      },
    }),
  };
};

export { handler };
