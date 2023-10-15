import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../ui-kit/Button';
import { Modal, useModal } from '../../Modal';

import styles from './styles.module.scss';

export const Navigation: FC = () => {
  const { isShown, toggle } = useModal();
  
  return (
    <>
      <div className={styles.Navigation}>
        <div className={styles.Navigation__container}>
          <Button text="+ New Sprint" type="header" onClick={toggle} />
          <Button text="+ New Project" type="header" to="/createProject" />
        </div>
        <Link className={styles.Navigation__logout} to="/login">
          Logout
        </Link>
      </div>
      <Modal isShown={isShown} hide={toggle} modalContent={<span>Hi there</span>} />
    </>
  );
};
