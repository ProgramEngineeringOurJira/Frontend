import { FC } from 'react';

import styles from './styles.module.scss';

export const Input: FC = () => {
  return <input type="text" placeholder="Search items" className={styles.Searchbar}></input>;
};
