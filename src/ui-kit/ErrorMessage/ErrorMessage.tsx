import { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const ErrorMassage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.ErrorMessage__wrapper}>
      <span className={styles.ErrorMessage}>{children}</span>
    </div>
  );
};
