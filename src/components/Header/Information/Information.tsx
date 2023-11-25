import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

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
import { Sprint, Workplace } from '../../../utils/types';

import styles from './styles.module.scss';

export const Information: FC = () => {
  const [activeBoard, setActiveBoard] = useState<Workplace>();
  const [activeSprint, setActiveSprint] = useState<Sprint | null>();
  const dispatch = useDispatch();
  const { isShown, toggle } = useModal();
  const navigate = useNavigate();
  const { idBoard, idSprint } = useParams();

  const boards = useSelector((state: RootState) => state.board.value);
  const sprints = useSelector((state: RootState) => state.sprint.value);

  const { data: workplacesData, isLoading: isWorkplacesLoading } = useGetRequest('workplaces');
  // TODO подставить проект по умолчанию
  const { data: sprintsData, isLoading: isSprintsLoading } = useGetRequest(`${activeBoard?.id}/sprints`);

  const { data: currentSprintData, isLoading: isCurrentSprintLoading } = useGetRequest(`${activeBoard?.id}/sprints/${idSprint}`);

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
    const navigationString = activeBoard?.sprints && activeBoard?.sprints?.length > 0 ? `/board/${id}/sprint/${activeBoard?.sprints[0].id}` : `/board/${id}`
    navigate(navigationString);
    setActiveBoard(activeBoard);
    setActiveSprint(activeBoard?.sprints[0] ?? null);
  };

  const updateActiveSprint = (id: string) => {
    const activeSprint = sprints.find((sprint) => sprint.id === id);
    navigate(`/board/${activeBoard?.id}/sprint/${id}`);
    setActiveSprint(activeSprint);
  };

  useEffect(() => {
    // TODO: fix any
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
      <div className={styles.Information}>
        <div className={styles.Information__sprint}>
          <span className={styles['Information__sprint-name']}>{activeBoard?.name}</span>
          {boards.length > 0 &&
            <Select placeholder={boards[boards.length - 1]?.name}>
              {isWorkplacesLoading ? <Loader /> : boards.map((board) => (
                <Option value={board.name} onClick={() => updateActiveBoard(board.id)} key={board.id}>
                  {board.name}
                </Option>
              ))}
            </Select>
          }
          {
            sprints.length > 0 &&
            <Select placeholder={sprints[sprints.length - 1]?.name}>
              {isSprintsLoading ? <Loader /> : sprints.map((sprint) => (
                <Option value={sprint.name ?? 'sprint'} onClick={() => updateActiveSprint(sprint.id)} key={sprint.id}>
                  {sprint.name}
                </Option>
              ))}
            </Select>
          }
        </div>
        <div className={styles.Information__members}>
          <div className={styles['Information__members-avatars']}></div>
          <div className={styles.divider} />
          <Button text="+ New Member" type="new-member" onClick={toggle} />
        </div>
      </div>
      <Modal isShown={isShown} hide={toggle} modalContent={<span>Hi there</span>} />
    </>
  );
};
