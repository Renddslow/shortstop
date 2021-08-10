import { h } from 'preact';
import sortOn from 'sort-on';
import { useState } from 'preact/hooks';

import Icon from '../components/Icon';
import Item from './Item';
import { TouchbaseGrid, Main, AgendaTitle, List, SectionTitle, TitleActionRow } from './styled';
import AddItem from './AddItem';

type Props = {
  params: {
    userId: string;
  };
};

const makeDatapoint = (title: string, id: string) => {
  const assignees = [
    { name: 'George MacDonald', initials: 'GM' },
    { name: 'Brandon Sanderson', initials: 'BS' },
    { name: 'Ursula Le Guinn', initials: 'UL' },
  ];
  return {
    title,
    id,
    done: false,
    assignee: assignees[Math.floor(assignees.length * Math.random())],
    flagged: false,
    created: new Date().toISOString(),
  };
};

const Touchbase = (props: Props) => {
  const [agenda, setAgenda] = useState([
    makeDatapoint('Discuss new t/b format', 'aa'),
    makeDatapoint('Just JavaScript', 'ab'),
  ]);

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

  return (
    <TouchbaseGrid>
      <Main>
        <AgendaTitle>Agenda</AgendaTitle>
        <List>
          {sortOn(agenda, ['flagged', 'created']).map((item) => (
            <Item
              {...item}
              key={item.id}
              onChange={() => flipFlag(item.id, 'done')}
              onFlag={() => flipFlag(item.id, 'flagged')}
              onArchive={() => archive(item.id)}
            />
          ))}
        </List>
        <AddItem>Add item to the agenda</AddItem>
        <AgendaTitle>Action Items</AgendaTitle>
        <List />
        <AddItem>Create action item</AddItem>
      </Main>
      <aside>
        <TitleActionRow>
          <SectionTitle>Goals</SectionTitle>
          <Icon onClick={() => {}}>add</Icon>
        </TitleActionRow>
        <TitleActionRow>
          <SectionTitle>Rocks</SectionTitle>
          <Icon onClick={() => {}}>add</Icon>
        </TitleActionRow>
      </aside>
    </TouchbaseGrid>
  );
};

export default Touchbase;
