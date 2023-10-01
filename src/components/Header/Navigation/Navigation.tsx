import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { Button } from '../../../ui-kit/Button';

export const Navigation: FC = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Navigation__container}>
        <Button text="+ New Sprint" type="header" />
        <Button text="+ New Project" type="header" to="/createProject" />
      </div>
      <Link className={styles.Navigation__logout} to="/login">
        Logout
      </Link>
    </div>
  );
};
