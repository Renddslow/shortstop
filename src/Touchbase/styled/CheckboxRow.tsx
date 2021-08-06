import { styled } from 'goober';

const CheckboxRow = styled('div')`
  display: grid;
  grid-template-columns: minmax(0, max-content) 1fr;
  align-items: center;
  grid-gap: 8px;
`;

export default CheckboxRow;
