import React, { ReactNode } from 'react';
import { useSelectContext } from '../useSelectContext';

import styles from './styles.module.scss';

export const Option: React.FC<{
  key: string;
  children: ReactNode | ReactNode[];
  value: string;
  // TODO: fix any
  onClick: (e: any) => void;
}> = ({ key, children, value, onClick }) => {
  const { changeSelectedOption } = useSelectContext();
  
  const clickHandler = () => {
    changeSelectedOption(value);
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <li className={styles.Option} onClick={clickHandler} key={key}>
      {children}
    </li>
  );
};
