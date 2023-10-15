import React, { ReactNode } from 'react';
import { useSelectContext } from '../useSelectContext';

import styles from './styles.module.scss';

export const Option: React.FC<{
  children: ReactNode | ReactNode[];
  value: string;
}> = ({ children, value }) => {
  const { changeSelectedOption } = useSelectContext();
  return (
    <li className={styles.Option} onClick={() => changeSelectedOption(value)}>
      {children}
    </li>
  );
};
