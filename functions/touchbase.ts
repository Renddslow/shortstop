import { Handler } from '@netlify/functions';
import { query, Client } from 'faunadb';

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

type Response = {
  data: Record<string, any>;
  ref: {
    toJSON: () => Record<string, any>;
  };
};

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const getLinkedData = (person: Person) => ({
  id: person.id,
  firstName: person.firstName,
  lastName: person.lastName,
  email: person.email,
});

const matchPeople = (data: Record<string, any>, people: Person[]) => {
  data.touchbase = getLinkedData(people.find(({ id }) => id === data.touchbase));
  data.createdBy = getLinkedData(people.find(({ id }) => id === data.createdBy));
  return data;
};

const handler: Handler = async (event, context) => {
  const path = /\/([a-zA-Z]+)$/.exec(event.path);

  if (!path) {
    // error
  }

  const [, personID] = path;

  const items = (await client.query(
    q.Map(q.Paginate(q.Match(q.Index('agendaOwner'), personID)), q.Lambda('x', q.Get(q.Var('x')))),
  )) as { data: Response[] };

  const people = (await client.query(
    q.Map(q.Paginate(q.Match(q.Index('allPeople'))), q.Lambda('x', q.Get(q.Var('x')))),
  )) as { data: Response[] };

  console.log(people);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: items.data.map(({ ref, data }) => ({
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

export { handler };
