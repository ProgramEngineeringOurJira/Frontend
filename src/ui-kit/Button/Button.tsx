import React, {
  FC,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

export type ButtonType = 'primary' | 'name';

export interface ButtonProps {
  onClick?: (
    e: ReactMouseEvent<HTMLDivElement> | ReactKeyboardEvent<HTMLDivElement>
  ) => void;
  disabled?: boolean;
  className?: string;
  text: string;
  type: ButtonType;
}

export const Button: FC<ButtonProps> = ({ onClick, disabled, className, text, type }) => {
  return (
    <button className={clsx(styles.Button, className, styles[`Button-${type}`])}>
      {text}
    </button>
  )
}