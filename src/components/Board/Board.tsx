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
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

export const Board: FC = () => {
  const { isShown, toggle } = useModal();
  const [inputValue, setInputValue] = useState(''); // строка введённая в компоненте input
  const [searchValue, setSearchValue] = useState(''); // строка, по которой происходит фильрация задач (компонентов Card)
  const sprint = useSelector((state: RootState) => state.currSprint.value);
  const { idSprint } = useParams();
  const { idBoard } = useParams();

  const onInputChange = (e: any) => {
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
          <div className={styles['Board__header-search-input']}>
            <Input placeholder="Search items" type="text" value={inputValue} onChange={onInputChange} />
            <Button
              type="new-member"
              onClick={onSearchButtonClicked}
              backgroundColor="#fff"
              className={styles.centerIcon}
            >
              <Icon iconName="search" />
            </Button>

            <Button
              type="new-member"
              onClick={onCancelButtonClicked}
              backgroundColor="#fff"
              className={clsx(styles.centerIcon, styles.btnCancel)}
            >
              <Icon iconName="cancel" />
            </Button>
          </div>
          <div className={styles.calendar}>
            <Icon iconName="calendar" width={25} height={25} />
            {sprint && (
              <span>
                {sprint.start_date?.split('T')[0]} - {sprint.end_date?.split('T')[0]}
              </span>
            )}
          </div>
        </div>
        <Button text="New Item" type="primary" onClick={toggle} disabled={!idSprint || !idBoard} />
      </div>
      <Columns searchValue={searchValue} />
      <Modal isShown={isShown} hide={toggle} modalContent={<AddCardModal hide={toggle} />} headerText="Add task" />
    </>
  );
};
