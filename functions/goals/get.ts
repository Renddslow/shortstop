import { HandlerResponse } from '@netlify/functions';
import { Client, query } from 'faunadb';

import { Response } from '../utils/type';
import getAllPeople from '../utils/getAllPeople';
import matchPeople from '../utils/matchPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const get = (personID: string) => async (): Promise<HandlerResponse> => {
  const goals = (await client.query(
    q.Map(q.Paginate(q.Match(q.Index('goalOwner'), personID)), q.Lambda('x', q.Get(q.Var('x')))),
  )) as { data: Response[] };

  const people = await getAllPeople(client);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: goals.data
        .filter(({ data }) => !data.archived)
        .map(({ ref, data }) => ({
          type: 'goal',
          id: ref.toJSON()['@ref'].id,
          attributes: matchPeople(data, people),
        })),
    }),
  };
};

export default get;
