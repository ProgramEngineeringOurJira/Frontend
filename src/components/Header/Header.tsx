import { FC, useState } from 'react';

import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Modal } from '../Modal';

import styles from './styles.module.scss';

export const Header: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={styles.App_btn__wrapper}>
        <Input />
        <Button text="New Item" type="primary" onClick={() => setIsModalOpen(!isModalOpen)} />
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};
