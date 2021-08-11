import { query, Client } from 'faunadb';
import { Handler } from '@netlify/functions';
import catchify from 'catchify';
import got from 'got';

import getKeyFromPath from './utils/getKeyFromPath';

const TRACTION_USERNAME = process.env.TRACTION_USERNAME;
const TRACTION_PASSWORD = process.env.TRACTION_PASSWORD;
const TRACTION_BASE = `https://traction.tools`;

const q = query;
const client = new Client({ secret: process.env.FAUNA_KEY });

const getTractionData = (url: string, token: string) => {
  return catchify(
    got(`${TRACTION_BASE}/api/v1${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).json(),
  );
};

const handler: Handler = async (event, context) => {
  const [err, personID] = getKeyFromPath('/api/people/:personID/rocks', event.path, 'personID');

  const person = (await client.query(q.Get(q.Match(q.Index('personID'), personID)))) as Record<
    string,
    any
  >;

  const [loginErr, res] = await catchify(
    got(`${TRACTION_BASE}/Token`, {
      method: 'POST',
      form: {
        grant_type: 'password',
        userName: TRACTION_USERNAME,
        password: TRACTION_PASSWORD,
      },
    }).json(),
  );

  const [rocksErr, rocks] = await getTractionData(
    `/rocks/user/${person.data.tractionUserID}?Include_Origin=true`,
    res.access_token,
  );

  const getMilestones = async (id: number) => {
    const [, milestones] = await getTractionData(`/rocks/${id}/milestones`, res.access_token);
    return milestones
      ? milestones.map((milestone) => ({
          id: milestone.Id,
          dueDate: milestone.DueDate,
          title: milestone.Name,
          complete: milestone.Status === 'Done',
        }))
      : [];
  };

  const rocksWithMilestones = await Promise.all(
    rocks
      .filter((rock) => !rock.Archived)
      .map(async (rock) => ({
        id: rock.Id,
        type: 'rock',
        attributes: {
          title: rock.Name,
          dueDate: rock.DueDate,
          complete: rock.Complete,
          status: rock.Completion,
          created: rock.CreateTime,
          milestones: await getMilestones(rock.Id),
        },
      })),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: rocksWithMilestones,
    }),
  };
};

export { handler };
