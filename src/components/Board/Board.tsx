import { FC, useState } from 'react';

import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Columns } from '../Columns';
import { Modal, useModal } from '../Modal';
import { AddCardModal } from '../AddCardModal';

import styles from './styles.module.scss';

export const Board: FC = () => {
  const { isShown, toggle } = useModal();
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (value: string) => {
    // TODO добавить debounce
    setSearchValue(value);
  };

  return (
    <>
      <div className={styles.Board__header}>
        <Input
          placeholder="Search items"
          type="text"
          value={searchValue}
          onChange={onSearchChange}
        />
        <Button text="New Item" type="primary" onClick={toggle} />
      </div>
      <Columns />
      <Modal isShown={isShown} hide={toggle} modalContent={<AddCardModal hide={toggle} />} headerText="Add task" />
    </>
  );
};
