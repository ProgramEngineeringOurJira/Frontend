import { FC } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

type ModalProps = {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText?: string;
};

export const Modal: FC<ModalProps> = ({ isShown, hide, modalContent, headerText }) => {
  const modal = (
    <>
      <div className={styles.backdrop} onClick={hide} />
      <div className={styles.Modal}>
        <div className={styles.Modal__container}>
          <div className={styles.Modal__header}>
            <span className={styles['Modal__header-text']}>{headerText}</span>
          </div>
          <div className={styles.Modal__button_close}>
            <Button className={styles['Modal__header-button']} onClick={hide} text={'X'} type={'add'} />
          </div>
          <div className={styles.Modal__content}>{modalContent}</div>
        </div>
      </div>
    </>
  );
  return isShown ? createPortal(modal, document.body) : null;
};
