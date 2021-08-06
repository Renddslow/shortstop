import { styled } from 'goober';
import Icon from '../components/Icon';
import { h } from 'preact';

const AddButton = styled('button')`
  font-size: inherit;
  color: #666;
  display: flex;
  background: transparent;
  border: 0;
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;

  span:not(:first-child) {
    margin-left: 8px;
  }

  .material-icons {
    font-size: 20px;
    color: #666;
  }
`;

const AddItem = () => {
  return (
    <AddButton>
      <Icon>add</Icon>
      <span>Add item to agenda</span>
    </AddButton>
  );
};

export default AddItem;
