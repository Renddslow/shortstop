import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { Client, query } from 'faunadb';

import { Response } from '../utils/type';
import matchPeople, { Person } from '../utils/matchPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const patch =
  (itemID: string) =>
  async (event: HandlerEvent): Promise<HandlerResponse> => {
    const { path, value } = JSON.parse(event.body);

    const item: Record<string, any> = await client.query(
      q.Get(q.Ref(q.Collection('agendas'), itemID)),
    );

    const updatePayload = {
      ...item.data,
      [path.replace('/', '')]: value,
    };

    const people = (await client.query(
      q.Map(q.Paginate(q.Match(q.Index('allPeople'))), q.Lambda('x', q.Get(q.Var('x')))),
    )) as { data: Response[] };
    await client.query(q.Update(q.Ref(q.Collection('agendas'), itemID), { data: updatePayload }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          type: 'agenda_item',
          id: itemID,
          attributes: matchPeople(
            updatePayload,
            people.data.map(({ data }) => data as Person),
          ),
        },
      }),
    };
  };

export default patch;
