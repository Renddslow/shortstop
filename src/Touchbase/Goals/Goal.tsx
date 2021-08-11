import { h } from 'preact';
import { styled } from 'goober';
import { Link, useLocation } from 'wouter-preact';

import { CardTitle, Card, DueDate, GoalMeta, TitleRow } from '../styled';

const Workshopping = styled('em')`
  font-style: italic;
  color: #666;
  font-size: 14px;
`;

const getPercentageColor = (value: number = 0) => {
  if (value === 0) {
    return {
      bg: '#eee',
      color: '#666',
    };
  }

  if (value < 0.35) {
    return {
      bg: '#f9d3dd',
      color: '#e83257',
    };
  }

  if (value < 0.75) {
    return {
      bg: '#f9dfd0',
      color: '#ea6230',
    };
  }

  if (value < 0.9) {
    return {
      bg: '#f6eec3',
      color: '#d5a90e',
    };
  }

  return {
    bg: '#cdefd9',
    color: '#3baf4d',
  };
};

const Percentage = styled('span')`
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 25px;
  background: ${(props) => getPercentageColor(props.value).bg};
  color: ${(props) => getPercentageColor(props.value).color};
`;

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const Goal = ({ id, title, workshopping, keyResults, dueDate }) => {
  const [parentLoc] = useLocation();
  const completion = keyResults.reduce((acc, { completion }) => acc + completion, 0);

  return (
    <Card>
      {/* @ts-ignore */}
      <TitleRow>
        <Link to={`${parentLoc}goals/${id}`}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <Percentage value={completion}>{Math.floor(completion * 100)}%</Percentage>
      </TitleRow>
      <GoalMeta>
        {workshopping && <Workshopping>(workshopping)</Workshopping>}
        <DueDate>{formatter.format(new Date(dueDate))}</DueDate>
      </GoalMeta>
    </Card>
  );
};

export default Goal;
