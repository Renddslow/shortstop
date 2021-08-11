import { h } from 'preact';

import {
  Avatar,
  ButtonRow,
  Checkbox,
  CheckboxContainer,
  CheckboxIcon,
  CheckboxRow,
  ItemRow,
  Label,
} from '../styled';
import Icon from '../../components/Icon';

type Person = {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
};

type Props = {
  id: string;
  touchbase: Person;
  complete: boolean;
  owner: Person;
  title: string;
  created: string;
  createdBy: Person;
  onChange: (checked: boolean) => void;
  onArchive: () => void;
};

const ActionItem = (props: Props) => {
  return (
    <ItemRow>
      <CheckboxRow>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id={props.id}
            checked={props.complete}
            onChange={() => props.onChange(!props.complete)}
          />
          <CheckboxIcon>check</CheckboxIcon>
        </CheckboxContainer>
        <Label htmlFor={props.id} checked={props.complete}>
          {props.title}
        </Label>
      </CheckboxRow>
      <ButtonRow>
        {props.complete && (
          <Icon onClick={props.onArchive} outlined>
            delete
          </Icon>
        )}
        <Avatar title={`${props.createdBy.firstName} ${props.createdBy.lastName}`}>
          {props.createdBy.firstName[0]}
          {props.createdBy.lastName[0]}
        </Avatar>
      </ButtonRow>
    </ItemRow>
  );
};

export default ActionItem;
