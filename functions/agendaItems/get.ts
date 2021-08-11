import { Client, query } from 'faunadb';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import { Response } from '../utils/type';
import matchPeople, { Person } from '../utils/matchPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const get =
  (personID: string) =>
  async (event: HandlerEvent): Promise<HandlerResponse> => {
    const items = (await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('agendaOwner'), personID)),
        q.Lambda('x', q.Get(q.Var('x'))),
      ),
    )) as { data: Response[] };

    const people = (await client.query(
      q.Map(q.Paginate(q.Match(q.Index('allPeople'))), q.Lambda('x', q.Get(q.Var('x')))),
    )) as { data: Response[] };

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: items.data
          .filter(({ data }) => (event.queryStringParameters.showArchived ? true : !data.archived))
          .map(({ ref, data }) => ({
            type: 'agenda_item',
            id: ref.toJSON()['@ref'].id,
            attributes: matchPeople(
              data,
              people.data.map(({ data }) => data as Person),
            ),
          })),
      }),
    };
  };

export default get;
