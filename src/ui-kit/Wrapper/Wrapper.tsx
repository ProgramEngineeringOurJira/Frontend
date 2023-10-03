import { FC, PropsWithChildren, ReactNode } from 'react';
import styles from './styles.module.scss';
import { Input } from '../Searchbar';
import { Button } from '../Button';

export const Wrapper: FC<PropsWithChildren<{ children: Element & ReactNode }>> = ({ children }) => {
  return (
    <div className={styles.Wrapper}>
      <Input />
      <Button text="New Item" type="primary" />
      {children}
    </div>
  );
};
