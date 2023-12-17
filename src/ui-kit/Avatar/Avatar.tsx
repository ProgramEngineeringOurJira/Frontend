import { FC } from 'react';

import styles from './styles.module.scss';

type AvatarProps = {
  avatarUrl: string;
  width?: number;
};

export const Avatar: FC<AvatarProps> = ({ avatarUrl, width = 34 }) => {
  const endpoint = import.meta.env.VITE_API_ENDPOINT;
  return (
    <img
      src={avatarUrl ? endpoint + `/v1${avatarUrl}` : 'https://www.studiodigiustosas.it/images/profilo.jpg'}
      alt="User's avatar"
      height={width}
      width={width}
      className={styles.Avatar}
    />
  );
};
