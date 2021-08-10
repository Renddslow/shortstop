import { Fragment, h } from 'preact';
import sortOn from 'sort-on';

import { AgendaTitle, List } from './styled';
import Item from './Item';
import { useEffect, useState } from 'preact/hooks';
import AddItem from './AddItem';

type Props = {
  personID: string;
};

const Agenda = (props: Props) => {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    fetch(`/api/people/${props.personID}/agenda`)
      .then((d) => d.json())
      .then((d) => {
        setAgenda(
          d.data.map(({ attributes, id }) => ({
            ...attributes,
            id,
          })),
        );
      });
  }, []);

  const flipFlag = (id: string, key: string) => {
    // fetch
    setAgenda((d) => {
      return d.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [key]: !item[key],
          };
        }
        return item;
      });
    });
  };

  const archive = (id: string) => {
    setAgenda((d) => d.filter((item) => item.id !== id));
  };

  const addItem = (item: Record<string, any>) => {
    setAgenda((t) => [...t, { id: item.id, ...item.attributes }]);
  };

  return (
    <Fragment>
      <AgendaTitle>Agenda</AgendaTitle>
      <List>
        {sortOn(agenda, ['flagged', 'created']).map((item) => (
          <Item
            {...item}
            key={item.id}
            onChange={() => flipFlag(item.id, 'complete')}
            onFlag={() => flipFlag(item.id, 'flagged')}
            onArchive={() => archive(item.id)}
          />
        ))}
      </List>
      <AddItem type="agenda" personID={props.personID} onCreate={addItem}>
        Add item to the agenda
      </AddItem>
    </Fragment>
  );
};

export default Agenda;
