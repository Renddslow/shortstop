import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { Client, query } from 'faunadb';

import matchPeople from '../utils/matchPeople';
import getAllPeople from '../utils/getAllPeople';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const create =
  (personID: string) =>
  async (event: HandlerEvent): Promise<HandlerResponse> => {
    const { owner, title } = JSON.parse(event.body).data.attributes;

    const faunaPayload = {
      touchbase: personID,
      complete: false,
      owner,
      title,
      created: new Date().toISOString(),
      createdBy: 'mmcelwee', // TODO: get from cookie
    };

    const data = (await client.query(
      q.Create(q.Collection('action-items'), { data: faunaPayload }),
    )) as Record<string, any>;

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          type: 'action_item',
          id: data.ref.toJSON()['@ref'].id,
          attributes: matchPeople(faunaPayload, await getAllPeople(client)),
        },
      }),
    };
  };

export default create;
