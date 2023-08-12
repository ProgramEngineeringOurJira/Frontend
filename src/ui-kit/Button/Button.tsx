import React, {
  FC,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

export type ButtonType = 'primary' | 'add';

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
  text: string;
  type: ButtonType;
}

export const Button: FC<ButtonProps> = ({ onClick, disabled, className, text, type }) => {
  return (
    <button className={clsx(styles.Button, className, styles[`Button-${type}`])} onClick={onClick}>
      {text}
    </button>
  )
}