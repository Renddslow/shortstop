import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { Client, query } from 'faunadb';

import matchPeople, { Person } from '../utils/matchPeople';
import { Response } from '../utils/type';

type Payload = {
  data: {
    type: 'agenda_item';
    attributes: {
      title: string;
    };
  };
};

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const create =
  (personID: string) =>
  async (event: HandlerEvent): Promise<HandlerResponse> => {
    const faunaPayload = {
      touchbase: personID,
      complete: false,
      flagged: false,
      created: new Date().toISOString(),
      createdBy: 'mmcelwee', // TODO: get from cookie
      title: (JSON.parse(event.body) as Payload).data.attributes.title,
    };

    const people = (await client.query(
      q.Map(q.Paginate(q.Match(q.Index('allPeople'))), q.Lambda('x', q.Get(q.Var('x')))),
    )) as { data: Response[] };
    const data = (await client.query(
      q.Create(q.Collection('agendas'), { data: faunaPayload }),
    )) as Record<string, any>;

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          type: 'agenda_item',
          id: data.ref.toJSON()['@ref'].id,
          attributes: matchPeople(
            faunaPayload,
            people.data.map(({ data }) => data as Person),
          ),
        },
      }),
    };
  };

export default create;
