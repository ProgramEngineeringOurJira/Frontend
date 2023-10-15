import { FC } from 'react';

import { Button } from '../../../ui-kit/Button';
import { Modal, useModal } from '../../Modal';

import styles from './styles.module.scss';
import { Select } from '../../../ui-kit/Select';
import { Option } from '../../../ui-kit/Select/Option';

export const Information: FC = () => {
  const { isShown, toggle } = useModal();

  return (
    <>
      <div className={styles.Information}>
        <div className={styles.Information__sprint}>
          <span className={styles['Information__sprint-name']}>Project Name</span>
          <Select>
            <Option value='Sprint 1'>Sprint 1</Option>
            <Option value='Sprint 2'>Sprint 2</Option>
            <Option value='Sprint 3'>Sprint 3</Option>
            <Option value='Sprint 4'>Sprint 4</Option>
            <Option value='Sprint 5'>Sprint 5</Option>
          </Select>
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
