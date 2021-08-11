import { h } from 'preact';

import Icon from '../../components/Icon';
import {
  ButtonRow,
  ItemRow,
  CheckboxRow,
  Checkbox,
  CheckboxContainer,
  CheckboxIcon,
  Avatar,
  Label,
} from '../styled';

type Props = {
  id: string;
  title: string;
  complete: boolean;
  flagged: boolean;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  onChange: (checked: boolean) => void;
  onFlag: (flagged: boolean) => void;
  onArchive: () => void;
};

const ARCHIVE_MESSAGE =
  'This will archive the item, for which there is currently no unarchive. Are you sure?';

const AgendaItem = (props: Props) => {
  const onDelete = () => {
    if (window.confirm(ARCHIVE_MESSAGE)) {
      props.onArchive();
    }
  };

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
        <Icon
          title="Click to make a priority item"
          onClick={() => props.onFlag(!props.flagged)}
          outlined={!props.flagged}
          color={props.flagged ? `#f00` : '#000'}
        >
          flag
        </Icon>
        <Icon onClick={onDelete} outlined>
          delete
        </Icon>
        <Avatar title={`${props.createdBy.firstName} ${props.createdBy.lastName}`}>
          {props.createdBy.firstName[0]}
          {props.createdBy.lastName[0]}
        </Avatar>
      </ButtonRow>
    </ItemRow>
  );
};

export default AgendaItem;
