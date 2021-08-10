import { styled } from 'goober';
import Icon from '../components/Icon';
import { h } from 'preact';
import { useState } from 'preact/hooks';

type Props = {
  children: string;
  onChange: (value: string) => void;
};

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
  padding: 8px 0;

  span:not(:first-child) {
    margin-left: 8px;
  }

  .material-icons {
    font-size: 20px;
    color: #666;
  }
`;

const InputRow = styled('div')`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr repeat(2, minmax(0, max-content));
  grid-gap: 4px;
  align-items: center;
`;

const Input = styled('input')`
  font-size: inherit;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #0003;
  width: 100%;

  &:focus {
    border-color: #0a5be2;
  }
`;

const Button = styled('button')`
  padding: 8px;
  border-radius: 4px;
  background: ${(props) => (props.primary ? '#0a5be2' : '#e7e7e7')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};
  border: 1px solid ${(props) => (props.primary ? '#0a5be2' : '#e7e7e7')};
  appearance: none;
  font-size: inherit;
  cursor: pointer;
`;

const AddItem = ({ children, onChange }: Props) => {
  const [addItem, setAddItem] = useState(false);
  const [title, setTitle] = useState('');

  const label = `What do you want to talk about?`;

  const cancel = () => {
    setAddItem(false);
    setTitle('');
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return addItem ? (
    <InputRow>
      <Input placeholder={label} aria-label={label} value={title} onChange={handleChange} />
      <Button primary onChange={() => onChange(title)}>
        Create
      </Button>
      <Button onClick={cancel}>Cancel</Button>
    </InputRow>
  ) : (
    <AddButton onClick={() => setAddItem((a) => !a)}>
      <Icon>add</Icon>
      <span>{children}</span>
    </AddButton>
  );
};

export default AddItem;
