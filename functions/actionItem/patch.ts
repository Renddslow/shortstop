import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { Client, query } from 'faunadb';

import matchPeople from '../utils/matchPeople';
import getAllPeople from '../utils/getAllPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const patch =
  (itemID: string) =>
  async (event: HandlerEvent): Promise<HandlerResponse> => {
    const { path, value } = JSON.parse(event.body);

    const item: Record<string, any> = await client.query(
      q.Get(q.Ref(q.Collection('action-items'), itemID)),
    );

    const updatePayload = {
      ...item.data,
      [path.replace('/', '')]: value,
    };

    await client.query(
      q.Update(q.Ref(q.Collection('action-items'), itemID), { data: updatePayload }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          type: 'action_item',
          id: itemID,
          attributes: matchPeople(updatePayload, await getAllPeople(client)),
        },
      }),
    };
  };

export default patch;
