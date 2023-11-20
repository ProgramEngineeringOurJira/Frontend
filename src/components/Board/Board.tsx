import { FC, useEffect, useState } from 'react';

import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Columns } from '../Columns';
import { Modal, useModal } from '../Modal';
import { AddCardModal } from '../AddCardModal';

import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useGetRequest } from '../../hooks/useGetRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../redux/features/boardSlice';
import { setSprints } from '../../redux/features/sprintSlice';

type Sprint = {
  id: string;
  collection: string;
};

type Issue = {
  id: string;
  collection: string;
};

type Board = {
  _id: string;
  name: string;
  description: string;
  states: string[];
  sprints: Sprint[];
  tasks: Issue[];
};

export const Board: FC = () => {
  const { isShown, toggle } = useModal();
  const [searchValue, setSearchValue] = useState('');
  const boardId = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state: any) => state.board.value);
  const [board, setBoard] = useState<Board>();
  const sprints = useSelector((state: any) => state.sprint.value);

  const onBoardLoad = (data: any) => {
    setBoard(data);
  };

  // TODO подставить проект по умолчанию
  const { queryResult, isLoading, isSuccess, mutate } = useGetRequest(onBoardLoad, `workplaces/${boardId?.id || ''}`);

  useEffect(() => {
    mutate({});
  }, [boardId]);

  const onSearchChange = (value: string) => {
    // TODO добавить debounce
    setSearchValue(value);
  };

  return (
    <>
      <div className={styles.Board__header}>
        <Input
          placeholder="Search items"
          type="text"
          value={searchValue}
          onChange={onSearchChange}
        />
        <Button text="New Item" type="primary" onClick={toggle} />
      </div>
      <Columns boardId={boardId.id} />
      <Modal isShown={isShown} hide={toggle} modalContent={<AddCardModal hide={toggle} />} headerText="Add task" />
    </>
  );
};
