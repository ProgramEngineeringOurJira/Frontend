import { FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export type ButtonType = 'primary' | 'add' | 'delete' | 'header' | 'new-member';

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  text: string;
  type: ButtonType;
  to?: string;
  typeButton?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({ onClick, disabled, className, text, type, to, typeButton }) => {
  if (to)
    return (
      <Link to={to}>
        <button
          className={clsx(styles.Button, className, styles[`Button-${type}`])}
          onClick={onClick}
          onMouseDown={(ev) => ev.preventDefault()}
          type={typeButton}
        >
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
        {text}
      </button>
    );
};
