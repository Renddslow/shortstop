import { h } from 'preact';
import { styled } from 'goober';

import Icon from '../components/Icon';
import Item from './Item';

type Props = {
  params: {
    userId: string;
  };
};

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 24px;
  padding: 24px;
  max-width: 1080px;
  margin: 0 auto;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled('article')`
  padding: 32px;
  background: #fff;
  box-shadow: 0 0 0 1px #0003;
  border-radius: 4px;
`;

const SectionTitle = styled('h2')`
  font-size: 18px;
`;

const TitleActionRow = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  align-items: center;
`;

const AgendaTitle = styled('h2')`
  font-size: 16px;
`;

const List = styled('div')`
  margin: 24px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
`;

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
  };
};

const Touchbase = (props: Props) => {
  const testData = [
    makeDatapoint('Discuss new t/b format', 'aa'),
    makeDatapoint('Just JavaScript', 'ab'),
  ];

  return (
    <Grid>
      <Main>
        <AgendaTitle>Agenda</AgendaTitle>
        <List>
          {testData.map((item) => (
            <Item {...item} key={item.id} />
          ))}
        </List>
        <AgendaTitle>Action Items</AgendaTitle>
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
    </Grid>
  );
};

export default Touchbase;
