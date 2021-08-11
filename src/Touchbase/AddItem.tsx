import { styled } from 'goober';
import Icon from '../components/Icon';
import { h } from 'preact';
import { useState } from 'preact/hooks';

type Props = {
  children: string;
  personID: string;
  placeholder?: string;
  type: 'agenda' | 'actions';
  onCreate: (value: Record<string, any>) => void;
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

const InputRow = styled('form')`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.type === 'agenda'
      ? '1fr repeat(2, minmax(0, max-content))'
      : '2fr 1fr repeat(2, minmax(0, max-content))'};
  grid-gap: 4px;
  align-items: center;
`;

const Input = styled('input')`
  font-size: inherit;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #0003;
  width: 100%;

  &:disabled {
    background: #ccc;
  }

  &:focus {
    border-color: #0a5be2;
  }
`;

const Select = styled('select')`
  font-size: inherit;
  padding: 7px 8px;
  border-radius: 4px;
  border: 1px solid #0003;
  width: 100%;

  &:disabled {
    background: #ccc;
  }

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

  &:disabled {
    opacity: 0.8;
  }
`;

const AddItem = ({ children, onCreate, personID, type, placeholder }: Props) => {
  const [addItem, setAddItem] = useState(false);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);

  const label = placeholder || `What do you want to talk about?`;

  const cancel = () => {
    setAddItem(false);
    setTitle('');
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    const attributes = type === 'agenda' ? { title } : { title, owner };

    fetch(`/api/people/${personID}/${type}`, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: `${type}_item`,
          attributes,
        },
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        onCreate(d.data);
        setAddItem(false);
        setTitle('');
        setOwner('');
        setLoading(false);
      });
  };

  return addItem ? (
    <InputRow onSubmit={handleCreate} type={type}>
      <Input
        placeholder={label}
        aria-label={label}
        value={title}
        disabled={loading}
        onChange={handleChange}
      />
      {type === 'actions' && (
        <Select>
          {/* todo: figure out how to do this */}
          <option>Pam Rogers</option>
          <option>Michael Scott</option>
        </Select>
      )}
      <Button type="submit" primary disabled={loading}>
        Create
      </Button>
      <Button onClick={cancel} type="button" disabled={loading}>
        Cancel
      </Button>
    </InputRow>
  ) : (
    <AddButton onClick={() => setAddItem((a) => !a)}>
      <Icon>add</Icon>
      <span>{children}</span>
    </AddButton>
  );
};

export default AddItem;
