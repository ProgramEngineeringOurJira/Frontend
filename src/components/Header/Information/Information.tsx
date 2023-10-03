import { FC } from 'react';

import { Button } from '../../../ui-kit/Button';  

import styles from './styles.module.scss';

export const Information: FC = () => {
  return (
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
        <Button text='+ New Member' type='new-member' />
      </div>
    </div>
  );
};
