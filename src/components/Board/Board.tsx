import { FC, useState } from 'react';

import { Input } from '../../ui-kit/Searchbar';
import { Button } from '../../ui-kit/Button';
import { Modal } from '../Modal';
import { Columns } from '../Columns';

import styles from './styles.module.scss';

export const Board: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={styles.Board__header}>
        <Input />
        <Button text="New Item" type="primary" onClick={() => setIsModalOpen(!isModalOpen)} />
      </div>
      <Columns />
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};
