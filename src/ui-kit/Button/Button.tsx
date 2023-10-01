import { FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export type ButtonType = 'primary' | 'add' | 'header' | 'new-member';

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  text: string;
  type: ButtonType;
  to?: string;
}

export const Button: FC<ButtonProps> = ({ onClick, disabled, className, text, type, to }) => {
  if (to)
    return (
      <Link to={to}>
        <button className={clsx(styles.Button, className, styles[`Button-${type}`])} onClick={onClick}>
          {text}
        </button>
      </Link>
    );
  else
    return (
      <button className={clsx(styles.Button, className, styles[`Button-${type}`])} onClick={onClick}>
        {text}
      </button>
    );
};
