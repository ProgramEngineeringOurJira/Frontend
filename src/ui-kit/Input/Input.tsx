import { FC } from 'react';

import styles from './styles.module.scss';

type InputProps = {
  placeholder?: string;
  type?: string;
}

export const Input: FC<InputProps> = ({ placeholder, type }) => {
  return <input type={type} placeholder={placeholder} className={styles.Searchbar}></input>;
};
