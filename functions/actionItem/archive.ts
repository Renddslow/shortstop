import { HandlerResponse } from '@netlify/functions';
import { Client, query } from 'faunadb';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const archive = (itemID: string) => async (): Promise<HandlerResponse> => {
  const item: Record<string, any> = await client.query(
    q.Get(q.Ref(q.Collection('action-items'), itemID)),
  );

  const updatePayload = {
    ...item.data,
    archived: true,
  };

  await client.query(
    q.Update(q.Ref(q.Collection('action-items'), itemID), { data: updatePayload }),
  );

  return {
    statusCode: 200,
    body: 'ok',
  };
};

export default archive;
