import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export type ButtonType = 'primary' | 'add' | 'delete' | 'header' | 'new-member';

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  text?: string;
  type: ButtonType;
  to?: string;
  typeButton?: 'button' | 'submit' | 'reset';
  backgroundColor?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  disabled,
  className,
  text,
  type,
  to,
  typeButton,
  children,
  backgroundColor
}) => {
  if (to)
    return (
      <Link to={to}>
        <button
          className={clsx(styles.Button, className, styles[`Button-${type}`])}
          onClick={onClick}
          onMouseDown={(ev) => ev.preventDefault()}
          type={typeButton}
          disabled={disabled}
        >
          {children}
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
        style={{ backgroundColor: backgroundColor }}
        disabled={disabled}
      >
        {children}
        {text}
      </button>
    );
};
