import {useParams } from 'react-router';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../ui-kit/Button';
import { AddSprintModal } from '../../AddSprintModal';
import { Modal, useModal } from '../../Modal';
import { AuthContext } from '../../../shared/context';
import { paths } from '../../../utils/paths';
import styles from './styles.module.scss';

type NavigationProps = {
  isCreateSprintVisible?: boolean;
};

export const Navigation: FC<NavigationProps> = ({ isCreateSprintVisible = true }) => {
  const {idBoard, idSprint} = useParams();
  const { isShown, toggle } = useModal();
  const { clearAll, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onExitClick = () => {
    clearAll();
    navigate(paths.login);
  };

  const onKristiClick = () => {
    if(idBoard && idSprint)
      navigate(`${paths.board}/${idBoard}${paths.sprint}/${idSprint}`);
    else if(idBoard)
      navigate(`${paths.board}/${idBoard}`);
    else
      navigate(paths.home);
  };

  return (
    <>
      <div className={styles.Navigation}>
        <div className={styles.Navigation__container}>
          {isCreateSprintVisible ? <Button text="+ New Sprint" type="header" onClick={toggle} /> : <></>}
          <Button text="+ New Project" type="header" to={paths.createProject} />
        </div>
        <div className={styles.Navigation__name} onClick={onKristiClick}>
          Kristi
        </div>
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
