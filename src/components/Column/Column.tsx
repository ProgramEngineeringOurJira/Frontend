import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

export interface ColumnProps {
  className?: string;
  text: string;
  quantity_tasks?: number;
}

export const Column: FC<PropsWithChildren<ColumnProps>> = ({ className, text, quantity_tasks = 0, children }) => {
  return (
    <div className={clsx(styles.Column, className)}>
      <div className={styles.Column__header}>
        <span className={styles.Column__header_text}>{text}</span>
        <div className={styles['Column__header_quantity-wrapper']}>
          <div className={styles.Column__header_quantity}>{quantity_tasks}</div>
        </div>
      </div>
      <div className={styles.Column__cards}>{children}</div>
    </div>
  );
};
