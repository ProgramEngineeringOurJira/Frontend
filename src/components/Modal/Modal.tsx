import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../../ui-kit/Button';
import { Switch } from '../../ui-kit/Switch/Switch';

import styles from './styles.module.scss';

type ModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const Modal: FC<ModalProps> = ({ setIsModalOpen }) => {
  return createPortal(
    <div
      className={styles.Modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsModalOpen(false);
      }}
    >
      <div className={styles.Modal_container}>
        <Button className={styles.Modal_close} onClick={() => setIsModalOpen(false)} text={'Х'} type={'add'} />
        <Switch />
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};
