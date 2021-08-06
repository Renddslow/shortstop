import { styled } from 'goober';

const ItemRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr minmax(0, max-content);
  grid-gap: 24px;
  align-items: center;
`;

export default ItemRow;
