import { styled } from 'goober';

const TitleRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr minmax(0, max-content);
  grid-gap: 12px;
  align-items: start;
`;

export default TitleRow;
