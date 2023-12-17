import { FC, useState } from 'react';

import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Columns } from '../Columns';
import { Modal, useModal } from '../Modal';
import { AddCardModal } from '../AddCardModal';

import styles from './styles.module.scss';
import { Icon } from '../../ui-kit/Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
  const [inputValue, setInputValue] = useState(''); // строка введённая в компоненте input
  const [searchValue, setSearchValue] = useState(''); // строка, по которой происходит фильрация задач (компонентов Card)
  const sprint = useSelector((state: RootState) => state.currSprint.value);

  const onInputChange = (e: any) => {
    // TODO добавить debounce
    setInputValue(e.target.value);
  };

  const onSearchButtonClicked = () => {
    // при клике на кнопку поиска
    setSearchValue(inputValue); // фильурем задачи
  };

  const onCancelButtonClicked = () => {
    // при клике на кнопку отмены
    setInputValue(''); // меняем значение в input
    setSearchValue(''); // сбрасываем фильтрацию
  };

  return (
    <>
      <div className={styles.Board__header}>
        <div className={styles['Board__header-search']}>
          <div>
            <Input placeholder="Search items" type="text" value={inputValue} onChange={onInputChange} />
            <Button text="Search" type="primary" onClick={onSearchButtonClicked} />
            <Button text="Cancel" type="primary" onClick={onCancelButtonClicked} />
          </div>

          <div className={styles.calendar}>
            <Icon iconName="calendar" iconSize={25} />
            <span>{`${sprint.start_date.split('T')[0]} - ${sprint.end_date.split('T')[0]}`}</span>
          </div>
        </div>
        <Button text="New Item" type="primary" onClick={toggle} />
      </div>
      <Columns searchValue={searchValue} />
      <Modal isShown={isShown} hide={toggle} modalContent={<AddCardModal hide={toggle} />} headerText="Add task" />
    </>
  );
};
