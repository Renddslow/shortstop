import { Fragment, h } from 'preact';
import sortOn from 'sort-on';

import { AgendaTitle, List } from '../styled';
import { useEffect, useState } from 'preact/hooks';
import AddItem from '../AddItem';
import deleteItem from '../utils/deleteItem';
import patchItem from '../utils/patchItem';
import { set } from 'husky';
import ActionItem from './ActionItem';

type Props = {
  personID: string;
};

const Agenda = (props: Props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/people/${props.personID}/actions`)
      .then((d) => d.json())
      .then((d) => {
        setItems(
          d.data.map(({ attributes, id }) => ({
            ...attributes,
            id,
          })),
        );
      });
  }, []);

  const flipFlag = (id: string, key: string) => {
    patchItem(
      'action',
      id,
      key,
      items.find((item) => item.id === id),
    ).then((d) => {
      setItems((a) => a.map((item) => (item.id === id ? d : item)));
    });
  };

  const archive = (id: string) => {
    deleteItem('action', id).then(() => {
      setItems((d) => d.filter((item) => item.id !== id));
    });
  };

  const addItem = (item: Record<string, any>) => {
    setItems((t) => [...t, { id: item.id, ...item.attributes }]);
  };

  return (
    <Fragment>
      <AgendaTitle>Action Items</AgendaTitle>
      <List>
        {sortOn(items, ['created']).map((item) => (
          <ActionItem
            {...item}
            onChange={() => flipFlag(item.id, 'complete')}
            onArchive={() => archive(item.id)}
          />
        ))}
      </List>
      <AddItem
        placeholder="What are you going to do this week?"
        type="actions"
        personID={props.personID}
        onCreate={addItem}
      >
        Create action item
      </AddItem>
    </Fragment>
  );
};

export default Agenda;
