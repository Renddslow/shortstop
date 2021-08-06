import { styled } from 'goober';

const Checkbox = styled('input')`
  appearance: none;
  border: 1px solid #0003;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background: transparent;
  cursor: pointer;

  &:checked {
    background: #0a5be2;
    border-color: #0a5be2;
  }
`;

export default Checkbox;
