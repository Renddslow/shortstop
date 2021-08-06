import { styled } from 'goober';

const Label = styled('label')`
  display: block;
  font-weight: ${(props) => (props.checked ? 400 : 500)};
  text-decoration: ${(props) => props.checked && 'line-through'};
  color: ${(props) => props.checked && '#444'};
  font-style: ${(props) => props.checked && 'italic'};
`;

export default Label;
