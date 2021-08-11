import { query } from 'faunadb';

import { Response } from './type';
import { Person } from './matchPeople';

const q = query;

const getAllPeople = async (client) => {
  const people = (await client.query(
    q.Map(q.Paginate(q.Match(q.Index('allPeople'))), q.Lambda('x', q.Get(q.Var('x')))),
  )) as { data: Response[] };

  return people.data.map(({ data }) => data as Person);
};

export default getAllPeople;
