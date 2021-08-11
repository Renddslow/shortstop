import { h } from 'preact';

import Icon from '../components/Icon';
import { TouchbaseGrid, Main, AgendaTitle, List, SectionTitle, TitleActionRow } from './styled';
import Agenda from './Agenda/Agenda';
import ActionItems from './ActionItems/ActionItems';

type Props = {
  params: {
    userId: string;
  };
};

const Touchbase = (props: Props) => {
  return (
    <TouchbaseGrid>
      <Main>
        <Agenda personID={props.params.userId} />
        <ActionItems personID={props.params.userId} />
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
