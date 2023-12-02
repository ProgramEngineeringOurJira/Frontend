import { FC } from 'react';

import styles from './styles.module.scss';

type InputProps = {
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (a: any) => void;
};

export const Input: FC<InputProps> = ({ value, placeholder, type, onChange }) => {
  return (
    <input value={value} type={type} placeholder={placeholder} onChange={onChange} className={styles.Searchbar}></input>
  );
};
