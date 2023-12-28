import { FC, useEffect, useState } from 'react';
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
import { paths } from '../../../utils/paths';

import styles from './styles.module.scss';
import { NameTag } from '../../../ui-kit/NameTag';
import { usersActions } from '../../../redux/features/usersSlice';
import { Avatar } from '../../../ui-kit/Avatar';
import { MoreUsersAvatar } from '../../../ui-kit/MoreUsersAvatar';
import { InviteUserModal } from '../../InviteUserModal';

type InformationProps = {
  isVisible?: boolean;
};

export const Information: FC<InformationProps> = ({ isVisible = true }) => {
  const [activeBoard, setActiveBoard] = useState<Workplace>();
  const dispatch = useDispatch();
  const { isShown, toggle } = useModal();
  const navigate = useNavigate();
  const { idBoard, idSprint, idTicket } = useParams();
  const [activeUserTag, setActiveUserTag] = useState<string>('');
  const shownUserAvatarsNumber = 4;

  const boards = useSelector((state: RootState) => state.board.value);
  const sprints = useSelector((state: RootState) => state.sprint.value);
  const workplaceUsers = useSelector((state: RootState) => state.users.value);

  const { data: workplacesData, isLoading: isWorkplacesLoading } = useGetRequest('workplaces');
  const { data: sprintsData, isLoading: isSprintsLoading } = useGetRequest(`${activeBoard?.id}/sprints`);
  const { data: currentSprintData, isLoading: isCurrentSprintLoading } = useGetRequest(
    `${activeBoard?.id}/sprints/${idSprint}`
  );
  const { data: workplaceUsersData, isLoading: isWorkplaceUsersLoading } = useGetRequest(
    `workplaces/${activeBoard?.id}/users`
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

  useEffect(() => {
    if (workplaceUsersData && !isWorkplaceUsersLoading) {
      dispatch(usersActions.setUsers({ users: workplaceUsersData, activeUserName: '' }));
    }
  }, [workplaceUsersData, isWorkplaceUsersLoading]);

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

  useEffect(() => {
    if (boards.length) {
      const activeBoard = boards.find((board: Workplace) => board.id === idBoard);
      setActiveBoard(activeBoard);
    }
  }, [boards, idBoard]);

  return (
    <>
      <div className={clsx(styles.Information, !isVisible ? styles.hide : '')}>
        <div className={styles.Information__sprint}>
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
          {!idTicket && !isWorkplaceUsersLoading && (
            <div className={styles['Information__sprint-tags']}>
              <NameTag
                text="All"
                active={workplaceUsers.activeUserName === ''}
                onClick={() => {
                  setActiveUserTag('');
                  dispatch(usersActions.setUsers({ ...workplaceUsers, activeUserName: '' }));
                }}
              />
              {workplaceUsers.users?.map((workplaceUser) => (
                <NameTag
                  key={workplaceUser.id}
                  text={workplaceUser.user.name}
                  onClick={() => {
                    setActiveUserTag(workplaceUser.user.name);
                    dispatch(usersActions.setUsers({ ...workplaceUsers, activeUserName: workplaceUser.user.name }));
                  }}
                  active={workplaceUser.user.name === activeUserTag}
                />
              ))}
            </div>
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
          {!idTicket && !isWorkplaceUsersLoading && (
            <div className={styles['Information__members-avatars']}>
              {workplaceUsers.users
                ?.slice(0, shownUserAvatarsNumber)
                .map((workplaceUser) => (
                  <Avatar key={workplaceUser.id} avatarUrl={workplaceUser.user.avatar_url}></Avatar>
                ))}
              {workplaceUsers.users?.length > shownUserAvatarsNumber && (
                <MoreUsersAvatar usersNumber={workplaceUsers.users.length - shownUserAvatarsNumber}></MoreUsersAvatar>
              )}
            </div>
          )}
          <div className={clsx(styles.divider, !activeBoard ? styles.hide : '')} />
          <Button text="+ New Member" type="new-member" onClick={toggle} className={!activeBoard ? styles.hide : ''} />
        </div>
      </div>
      <Modal
        isShown={isShown}
        hide={toggle}
        headerText="Invite new member"
        modalContent={<InviteUserModal hide={toggle} />}
      />
    </>
  );
};
