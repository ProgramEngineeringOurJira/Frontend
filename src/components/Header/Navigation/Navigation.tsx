import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../ui-kit/Button';
import { AddSprintModal } from '../../AddSprintModal';
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

  const onKristiClick = ()=>{
    navigate(paths.home);
  };

  return (
    <>
      <div className={styles.Navigation}>
        <div className={styles.Navigation__container}>
          <Button text="+ New Sprint" type="header" onClick={toggle} />
          <Button text="+ New Project" type="header" to="/createProject" />
        </div>
        <div className={styles.Navigation__name} onClick={onKristiClick}>Kristi</div>
        <Button
          className={styles.Navigation__logout}
          to="/login"
          onClick={onExitClick}
          text={`Logout ${user?.name}`}
          type="primary"
        />
      </div>
      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={<AddSprintModal hide={toggle} />}
        headerText="Add new sprint"
      />
    </>
  );
};
