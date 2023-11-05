import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../ui-kit/Button';
import { Modal, useModal } from '../../Modal';

import styles from './styles.module.scss';
import { AuthContext } from '../../../shared/context';

export const Navigation: FC = () => {
  const { isShown, toggle } = useModal();
  const { clearAll, user } = useContext(AuthContext);
  
  return (
    <>
      <div className={styles.Navigation}>
        <div className={styles.Navigation__container}>
          <Button text="+ New Sprint" type="header" onClick={toggle} />
          <Button text="+ New Project" type="header" to="/createProject" />
        </div>
        <Link className={styles.Navigation__logout} to="/login">
          {`Logout ${user?.email}`}
        </Link>
      </div>
      <Modal isShown={isShown} hide={toggle} modalContent={<span>Hi there</span>} />
    </>
  );
};
