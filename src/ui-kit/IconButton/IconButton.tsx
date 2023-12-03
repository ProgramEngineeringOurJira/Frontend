import { FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Icon } from '../../ui-kit/Icon';

export type ButtonType = 'primary' | 'add' | 'delete' | 'header' | 'new-member' | 'icon';

export interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  text: string;
  type: ButtonType;
  to?: string;
  typeButton?: 'button' | 'submit' | 'reset';
  iconPath:string;
  iconColor:string;
}

export const IconButton: FC<IconButtonProps> = ({ onClick, disabled, className, text, type, to, typeButton,iconPath,iconColor }) => {
  if (to)
    return (
      <Link to={to}>
        <button
          className={clsx(styles.Button, className, styles[`Button-${type}`])}
          onClick={onClick}
          onMouseDown={(ev) => ev.preventDefault()}
          type={typeButton}
        >
          <Icon iconName={iconPath} color={iconColor} />
          {text}
        </button>
      </Link>
    );
  else
    return (
      <button
        className={clsx(styles.Button, className, styles[`Button-${type}`])}
        onClick={onClick}
        onMouseDown={(ev) => ev.preventDefault()}
        type={typeButton}
      >
        <Icon iconName={iconPath} color={iconColor} />
        {text}
      </button>
    );
};
