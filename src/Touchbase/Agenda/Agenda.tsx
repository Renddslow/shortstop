import { Fragment, h } from 'preact';
import sortOn from 'sort-on';

import { AgendaTitle, List } from '../styled';
import AgendaItem from './AgendaItem';
import { useEffect, useState } from 'preact/hooks';
import AddItem from '../AddItem';
import deleteItem from '../utils/deleteItem';
import patchItem from '../utils/patchItem';

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
    patchItem(
      'agenda',
      id,
      key,
      agenda.find((item) => item.id === id),
    ).then((d) => {
      setAgenda((a) => a.map((item) => (item.id === id ? d : item)));
    });
  };

  const archive = (id: string) => {
    deleteItem('agenda', id).then(() => {
      setAgenda((d) => d.filter((item) => item.id !== id));
    });
  };

  const addItem = (item: Record<string, any>) => {
    setAgenda((t) => [...t, { id: item.id, ...item.attributes }]);
  };

  return (
    <Fragment>
      <AgendaTitle>Agenda</AgendaTitle>
      <List>
        {sortOn(agenda, ['flagged', 'created']).map((item) => (
          <AgendaItem
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
