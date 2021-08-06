import { styled } from 'goober';

const TitleActionRow = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  align-items: center;
`;

export default TitleActionRow;
