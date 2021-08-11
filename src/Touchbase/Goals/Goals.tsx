import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Goal from './Goal';
import { CardList } from '../styled';

type Props = {
  personID: string;
};

const Goals = ({ personID }: Props) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`/api/people/${personID}/goals`)
      .then((d) => d.json())
      .then((d) =>
        setGoals(
          d.data.map((goal) => ({
            id: goal.id,
            ...goal.attributes,
          })),
        ),
      );
  }, []);

  return (
    <Fragment>
      <CardList>
        {goals.map((goal) => (
          <Goal key={goal.id} {...goal} />
        ))}
      </CardList>
    </Fragment>
  );
};

export default Goals;
