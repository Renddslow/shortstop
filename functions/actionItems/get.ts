import { Client, query } from 'faunadb';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import { Response } from '../utils/type';
import matchPeople from '../utils/matchPeople';
import getAllPeople from '../utils/getAllPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const get =
  (personID: string) =>
  async (event: HandlerEvent): Promise<HandlerResponse> => {
    const items = (await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('actionOwner'), personID)),
        q.Lambda('x', q.Get(q.Var('x'))),
      ),
    )) as { data: Response[] };

    const people = await getAllPeople(client);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: items.data
          .filter(({ data }) => (event.queryStringParameters.showArchived ? true : !data.archived))
          .map(({ ref, data }) => ({
            type: 'action_item',
            id: ref.toJSON()['@ref'].id,
            attributes: matchPeople(data, people),
          })),
      }),
    };
  };

export default get;
