import { FC } from 'react';

import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Columns } from '../Columns';
import { Modal, useModal } from '../Modal';

import styles from './styles.module.scss';
import { AddCardModal } from '../AddCardModal';

export const Board: FC = () => {
  const { isShown, toggle } = useModal();

  return (
    <>
      <div className={styles.Board__header}>
        <Input placeholder="Search items" type="text" />
        <Button text="New Item" type="primary" onClick={toggle} />
      </div>
      <Columns />
      <Modal isShown={isShown} hide={toggle} modalContent={<AddCardModal hide={toggle} />} headerText="Add task" />
    </>
  );
};
