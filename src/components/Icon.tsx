import { styled } from 'goober';
import { h, ComponentChildren } from 'preact';

type Props = {
  children: ComponentChildren;
  className?: string;
  color?: string;
  outlined?: boolean;
  title?: string;
  onClick?: (e: MouseEvent) => void;
};

const IconWrapper = styled('span')`
  color: ${(props) => (props.color ? props.color : '#000')};
  line-height: 1;
`;

const IconButton = styled('button')`
  padding: 4px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: inherit;
  width: max-content;
`;

const Icon = ({ children, outlined, onClick, className, color, title }: Props) => {
  const IconChild = () => {
    const cx = [className, outlined ? 'material-icons-outlined' : 'material-icons'];
    return (
      <IconWrapper title={title} color={color} className={cx.filter((c) => c).join(' ')}>
        {children}
      </IconWrapper>
    );
  };

  return onClick ? (
    <IconButton onClick={onClick}>
      <IconChild />
    </IconButton>
  ) : (
    <IconChild />
  );
};

export default Icon;
