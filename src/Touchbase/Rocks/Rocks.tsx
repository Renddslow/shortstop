import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { CardList } from '../styled';
import Rock from './Rock';

const Rocks = ({ personID }) => {
  const [rocks, setRocks] = useState([]);

  useEffect(() => {
    fetch(`/api/people/${personID}/rocks`)
      .then((d) => d.json())
      .then((d) => {
        setRocks(
          d.data.map((rock) => ({
            id: rock.id,
            ...rock.attributes,
          })),
        );
      });
  }, []);

  return (
    <CardList>
      {rocks.map((rock) => (
        <Rock {...rock} key={rock.id} />
      ))}
    </CardList>
  );
};

export default Rocks;
