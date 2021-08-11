import { h } from 'preact';
import { styled } from 'goober';

import Icon from '../components/Icon';
import { TouchbaseGrid, Main, SectionTitle, TitleActionRow } from './styled';
import Agenda from './Agenda/Agenda';
import ActionItems from './ActionItems/ActionItems';
import PersonProvider from '../PersonProvider';
import Goals from './Goals';

type Props = {
  params: {
    userId: string;
  };
};

const Aside = styled('aside')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
`;

const Touchbase = (props: Props) => {
  return (
    <PersonProvider personID={props.params.userId}>
      <TouchbaseGrid>
        <Main>
          <Agenda personID={props.params.userId} />
          <ActionItems personID={props.params.userId} />
        </Main>
        <Aside>
          <div>
            <TitleActionRow>
              <SectionTitle>Goals</SectionTitle>
              <Icon onClick={() => {}}>add</Icon>
            </TitleActionRow>
            <Goals personID={props.params.userId} />
          </div>
          <div>
            <TitleActionRow>
              <SectionTitle>Rocks</SectionTitle>
            </TitleActionRow>
          </div>
        </Aside>
      </TouchbaseGrid>
    </PersonProvider>
  );
};

export default Touchbase;
