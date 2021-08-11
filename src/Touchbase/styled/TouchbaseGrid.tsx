import { styled } from 'goober';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 24px;
  padding: 24px;
  max-width: 1080px;
  margin: 0 auto;
  align-items: start;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export default Grid;
