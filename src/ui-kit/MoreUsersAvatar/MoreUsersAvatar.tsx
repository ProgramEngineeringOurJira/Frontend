import { FC } from 'react';

import styles from './styles.module.scss';

type MoreUsersAvatarProps = {
  usersNumber: number;
};

export const MoreUsersAvatar: FC<MoreUsersAvatarProps> = ({ usersNumber }) => {
  return (
    <div className={styles.MoreUsersAvatar}>
      <span className={styles.MoreUsersAvatar__text}>+{usersNumber}</span>
    </div>
  );
};
