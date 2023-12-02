import { FC, useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import clsx from 'clsx';

import { useGetRequest } from '../../../hooks/useGetRequest';
import { RootState } from '../../../redux/store';
import { boardActions } from '../../../redux/features/boardSlice';
import { sprintsActions } from '../../../redux/features/sprintSlice';
import { currSprintActions } from '../../../redux/features/currentSprintSlice';
import { Modal, useModal } from '../../Modal';
import { Button } from '../../../ui-kit/Button';
import { Select } from '../../../ui-kit/Select';
import { Option } from '../../../ui-kit/Select/Option';
import { Loader } from '../../../ui-kit/Loader';
import { Workplace } from '../../../utils/types';
import { useSendRequest } from '../../../hooks/useSendRequest';
import { TextForm } from '../../../ui-kit/TextForm';
import { Input } from '../../../ui-kit/Input';
import { FormElementWrapper } from '../../../ui-kit/FormElementWrapper';
import { validateEmail } from '../../../utils/helpers';
import { paths } from '../../../utils/paths';

import styles from './styles.module.scss';

type InformationProps = {
  isVisible?: boolean;
};

export const Information: FC<InformationProps> = ({ isVisible = true }) => {
  const [activeBoard, setActiveBoard] = useState<Workplace>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { isShown, toggle } = useModal();
  const navigate = useNavigate();
  const { idBoard, idSprint, idTicket } = useParams();
  const [validationError, setValidationError] = useState('');

  const boards = useSelector((state: RootState) => state.board.value);
  const sprints = useSelector((state: RootState) => state.sprint.value);

  const { data: workplacesData, isLoading: isWorkplacesLoading } = useGetRequest('workplaces');
  // TODO подставить проект по умолчанию
  const { data: sprintsData, isLoading: isSprintsLoading } = useGetRequest(`${activeBoard?.id}/sprints`);

  const { data: currentSprintData, isLoading: isCurrentSprintLoading } = useGetRequest(
    `${activeBoard?.id}/sprints/${idSprint}`
  );

  useEffect(() => {
    if (workplacesData && !isWorkplacesLoading) {
      dispatch(boardActions.setBoards(workplacesData));
    }
  }, [workplacesData, isWorkplacesLoading]);

  useEffect(() => {
    if (sprintsData && !isSprintsLoading) {
      dispatch(sprintsActions.setSprints(sprintsData));
    }
  }, [sprintsData, isSprintsLoading]);

  useEffect(() => {
    if (currentSprintData && !isCurrentSprintLoading) {
      dispatch(currSprintActions.setSprint(currentSprintData));
    }
  }, [currentSprintData, isCurrentSprintLoading, idSprint]);

  const updateActiveBoard = (id: string) => {
    const activeBoard = boards.find((board) => board.id === id);
    const navigationString =
      activeBoard?.sprints && activeBoard?.sprints?.length > 0
        ? `/board/${id}/sprint/${activeBoard?.sprints[0].id}`
        : `/board/${id}`;
    navigate(navigationString);
    setActiveBoard(activeBoard);
  };

  const updateActiveSprint = (id: string) => {
    navigate(`/board/${activeBoard?.id}/sprint/${id}`);
  };

  const submitCallback = () => {};

  const { sendRequest, isError, queryResult } = useSendRequest(submitCallback, `workplaces/${activeBoard?.id}/invite`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      email: email
    };

    if (email.length > 0 && validateEmail(email)) {
      sendRequest(sendObject);
      setValidationError('');
      setEmail('');
    } else {
      setValidationError('Oooops, something went wrong!');
      setEmail('');
    }
  };

  useEffect(() => {
    if (boards.length) {
      const activeBoard = boards.find((board: Workplace) => board.id === idBoard);
      //if (boards.length > 0 && boardId === undefined) {
      //  navigate(`/board/${boards[boards.length - 1]._id}`);
      //}
      setActiveBoard(activeBoard);
    }
  }, [boards, idBoard]);

  return (
    <>
      <div className={clsx(styles.Information, !isVisible ? styles.hide : '')}>
        <div className={styles.Information__sprint}>
          <span className={styles['Information__sprint-name']}>{activeBoard?.name}</span>
          {boards.length > 0 && !idTicket && (
            <Select placeholder={boards[boards.length - 1]?.name}>
              {isWorkplacesLoading ? (
                <Loader />
              ) : (
                boards.map((board) => (
                  <Option value={board.name} onClick={() => updateActiveBoard(board.id)} key={board.id}>
                    {board.name}
                  </Option>
                ))
              )}
            </Select>
          )}
          {sprints.length > 0 && !idTicket && (
            <Select placeholder={sprints[sprints.length - 1]?.name ?? 'sprint'}>
              {isSprintsLoading ? (
                <Loader />
              ) : (
                sprints.map((sprint) => (
                  <Option value={sprint.name ?? 'sprint'} onClick={() => updateActiveSprint(sprint.id)} key={sprint.id}>
                    {sprint.name}
                  </Option>
                ))
              )}
            </Select>
          )}
          {idTicket && (
            <Button
              text="Back to sprint"
              type="primary"
              onClick={() => {
                navigate(`${paths.board}/${idBoard}${paths.sprint}/${idSprint}`);
              }}
            />
          )}
        </div>
        <div className={styles.Information__members}>
          <div className={styles['Information__members-avatars']}></div>
          <div className={styles.divider} />
          <Button text="+ New Member" type="new-member" onClick={toggle} />
        </div>
      </div>
      <Modal
        isShown={isShown}
        hide={toggle}
        headerText="Invite new member"
        modalContent={
          <>
            <form onSubmit={onSubmit} className={styles.InviteForm}>
              <FormElementWrapper>
                <TextForm text="Email" />
                <Input
                  type="text"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormElementWrapper>
              <Button text="Invite" type="primary" typeButton="submit" />
            </form>
            {isError && <span>{queryResult}</span>}
            {validationError && <span className={styles.error}>{validationError}</span>}
          </>
        }
      />
    </>
  );
};
