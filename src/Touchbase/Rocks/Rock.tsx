import { h } from 'preact';
import { styled } from 'goober';

import { Card, CardTitle, DueDate, GoalMeta } from '../styled';

const RockTitle = styled(CardTitle)`
  color: #000;
  cursor: auto;
`;

const Status = styled('span')`
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 25px;
  color: #fff;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status) {
      case 'OnTrack':
        return '#45a4e0';
      case 'OffTrack':
      case 'AtRisk':
        return '#e83257';
      case 'Done':
        return '#3baf4d';
    }
  }}};
`;

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const getStatusTitle = (status: string) => {
  switch (status) {
    case 'OnTrack':
      return 'On Track';
    case 'OffTrack':
    case 'AtRisk':
      return 'Off Track';
    case 'Done':
      return 'Done';
  }
};

const Rock = ({ title, status, dueDate }) => {
  return (
    <Card>
      <RockTitle>{title}</RockTitle>
      <GoalMeta>
        <Status status={status}>{getStatusTitle(status)}</Status>
        <DueDate>{formatter.format(new Date(dueDate))}</DueDate>
      </GoalMeta>
      {/* TODO: milestones */}
    </Card>
  );
};

export default Rock;
