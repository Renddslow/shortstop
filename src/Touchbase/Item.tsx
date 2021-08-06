import { h } from 'preact';

import Icon from '../components/Icon';
import {
  ButtonRow,
  ItemRow,
  CheckboxRow,
  Checkbox,
  CheckboxContainer,
  CheckboxIcon,
  Avatar,
  Label,
} from './styled';

type Props = {
  id: string;
  title: string;
  done: boolean;
  flagged: boolean;
  assignee: {
    name: string;
    initials: string;
  };
};

const Item = (props: Props) => {
  return (
    <ItemRow>
      <CheckboxRow>
        <CheckboxContainer>
          <Checkbox type="checkbox" id={props.id} checked={props.done} />
          <CheckboxIcon>check</CheckboxIcon>
        </CheckboxContainer>
        <Label htmlFor={props.id}>{props.title}</Label>
      </CheckboxRow>
      <ButtonRow>
        <Icon
          title="Click to make a priority item"
          onClick={() => {}}
          outlined={false}
          color="#f00"
        >
          flag
        </Icon>
        <Icon
          onClick={() =>
            window.confirm(
              'This will archive the item, for which there is currently no unarchive. Are you sure?',
            )
          }
          outlined
        >
          delete
        </Icon>
        <Avatar title={props.assignee.name}>{props.assignee.initials}</Avatar>
      </ButtonRow>
    </ItemRow>
  );
};

export default Item;
