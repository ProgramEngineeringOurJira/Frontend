import { FC, PropsWithChildren, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { Button } from '../../ui-kit/Button';
import columnsSlice from '../../redux/features/columns/columnsSlice';

import styles from './styles.module.scss';

export interface ColumnProps {
  className?: string;
  text: string;
}

export const Column: FC<PropsWithChildren<ColumnProps>> = ({ className, text, children }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('Задача');
  const [description, setDescription] = useState('Описание');
  const [newColIndex, setNewColIndex] = useState(1);

  const onSubmit = (type: string) => {
    if (type === 'add') {
      dispatch(
        columnsSlice.actions.addTask({
          title,
          description,
          newColIndex
        })
      );
    }
  };

  return (
    <div className={clsx(styles.Column, className)}>
      <div className={styles.Column__header}>
        <span className={styles.Column__header_text}>{text}</span>
        <div className={styles['Column__header_quantity-wrapper']}>
          <div className={styles.Column__header_quantity}>0</div>
        </div>
        <Button
          className={styles['Column__header_btn-add']}
          text="+"
          type="add"
          onClick={() => onSubmit('add')}
        ></Button>
      </div>
      <div className={styles.Column__cards}>{children}</div>
    </div>
  );
};
