import { FC, useEffect, useState } from 'react';

import { useGetRequest } from '../../../hooks/useGetRequest';
import { Button } from '../../../ui-kit/Button';
import { Modal, useModal } from '../../Modal';
import { Select } from '../../../ui-kit/Select';
import { Option } from '../../../ui-kit/Select/Option';

import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../../redux/features/boardSlice';
import { useNavigate, useParams } from 'react-router';
import { setSprints } from '../../../redux/features/sprintSlice';

type Sprint = {
  id: string;
  name?: string;
  start_date: string;
  end_date: string;
  issues: Issue[];
};

type Issue = {
  id: string;
  name: string;
  text: string;
  priority: string;
  state: string;
};

type Board = {
  _id: string;
  name: string;
  description: string;
  states: string[];
  sprints: Sprint[];
  tasks: Issue[];
};

export const Information: FC = () => {
  const [activeBoard, setActiveBoard] = useState<Board>();
  const [activeSprint, setActiveSprint] = useState<Sprint | null>();
  const dispatch = useDispatch();
  const { isShown, toggle } = useModal();
  const [boardsNames, setBoardsNames] = useState<Board[]>([]);
  const [sprintsNames, setSprintsNames] = useState<Sprint[]>([]);
  const navigate = useNavigate();
  const {idBoard, isSprint} = useParams();

  // TODO убрать any
  const boards = useSelector((state: any) => state.board.value);
  const sprints = useSelector((state: any) => state.sprint.value);

  const onBoardsLoad = (data: any) => {
    setBoardsNames(data);
    dispatch(setBoards(data));
  };

  const { mutate } = useGetRequest(onBoardsLoad, 'workplaces');

  useEffect(() => {
    mutate({});
  }, []);

  const updateActiveBoard = (id: string) => {
    const activeBoard = boardsNames.find((board) => board._id === id);
    console.log(activeBoard)
    const navigationString = activeBoard?.sprints && activeBoard?.sprints?.length > 0 ?  `/board/${id}/sprint/${activeBoard?.sprints[0].id}` : `/board/${id}`
    navigate(navigationString);
    setActiveBoard(activeBoard);
    console.log(activeBoard);
    setActiveSprint(activeBoard?.sprints[0] ?? null);
  };

  const updateActiveSprint = (id: string) => {
    const activeSprint = sprintsNames.find((sprint) => sprint.id === id);
    navigate(`/board/${activeBoard?._id}/sprint/${id}`);
    setActiveSprint(activeSprint);
  };

  const onSprintsLoad = (data: any) => {
    setSprintsNames(data);
    dispatch(setSprints(data));
  };

  // TODO подставить проект по умолчанию
  const { mutate: mutateSprints } = useGetRequest(onSprintsLoad, `${activeBoard?._id}/sprints/0/0`);

  useEffect(() => {
    mutateSprints({});
  }, [activeBoard]);

  useEffect(() => {
    // TODO: fix any
    const activeBoard = boards.find((board: any) => board._id === idBoard);
    //if (boards.length > 0 && boardId === undefined) {
    //  navigate(`/board/${boards[boards.length - 1]._id}`);
    //}
    setActiveBoard(activeBoard);
  }, [boards, idBoard]);

  return (
    <>
      <div className={styles.Information}>
        <div className={styles.Information__sprint}>
          <span className={styles['Information__sprint-name']}>{activeBoard?.name}</span>
          <Select placeholder={boardsNames[boardsNames.length - 1]?.name}>
            {boardsNames.map((board) => (
              <Option value={board.name} onClick={() => updateActiveBoard(board._id)} key={board._id}>
                {board.name}
              </Option>
            ))}
          </Select>
          <Select placeholder={sprintsNames[sprintsNames.length - 1]?.name}>
            {sprintsNames.map((sprint) => (
              <Option value={sprint.name ?? 'sprint'} onClick={() => updateActiveSprint(sprint.id)} key={sprint.id}>
                {sprint.name}
              </Option>
            ))}
          </Select>
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
