import { FC } from 'react';

import { Button } from '../../../ui-kit/Button';
import { Modal, useModal } from '../../Modal';

import styles from './styles.module.scss';

export const Information: FC = () => {
  const { isShown, toggle } = useModal();

  return (
    <>
      <div className={styles.Information}>
        <div className={styles.Information__sprint}>
          <span className={styles['Information__sprint-name']}>Project Name</span>
          <select>
            <option>Sprint 1</option>
            <option>Sprint 2</option>
            <option>Sprint 3</option>
            <option>Sprint 4</option>
            <option>Sprint 5</option>
          </select>
        </div>
        <div className={styles.Information__members}>
          <div className={styles['Information__members-avatars']}></div>
          <div className={styles.divider}></div>
          <Button text="+ New Member" type="new-member" onClick={toggle} />
        </div>
      </div>
      <Modal isShown={isShown} hide={toggle} modalContent={<span>Hi there</span>} />
    </>
  );
};
