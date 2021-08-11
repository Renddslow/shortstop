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
    fetch(`/api/agenda-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        op: 'replace',
        path: `/${key}`,
        value: !agenda.find((item) => item.id === id)[key],
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        setAgenda((a) =>
          a.map((item) =>
            item.id === id
              ? {
                  id: d.data.id,
                  ...d.data.attributes,
                }
              : item,
          ),
        );
      });
  };

  const archive = (id: string) => {
    fetch(`/api/agenda-items/${id}`, {
      method: 'DELETE',
    }).then(() => {
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
