import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../ui-kit/Button';
import { Modal, useModal } from '../../Modal';
import { AuthContext } from '../../../shared/context';
import { paths } from '../../../utils/paths';

import styles from './styles.module.scss';

export const Navigation: FC = () => {
  const { isShown, toggle } = useModal();
  const { clearAll, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onExitClick = () => {
    clearAll();
    navigate(paths.login);
  };

  return (
    <>
      <div className={styles.Navigation}>
        <div className={styles.Navigation__container}>
          <Button text="+ New Sprint" type="header" onClick={toggle} />
          <Button text="+ New Project" type="header" to="/createProject" />
        </div>
        <span className={styles.Navigation__name}>Kristi</span>
        <Button
          className={styles.Navigation__logout}
          to="/login"
          onClick={onExitClick}
          text={`Logout ${user?.email.split('@')[0]}`}
          type='primary'
        />
      </div>
      <Modal isShown={isShown} hide={toggle} modalContent={<span>Hi there</span>} />
    </>
  );
};
