import { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const FormElementWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.FormElementWrapper}>{children}</div>;
};
