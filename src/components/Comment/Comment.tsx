import { FC } from 'react';

import styles from './styles.module.scss';
import { Role } from '../../utils/constants';
import { getElapsedDays } from '../../utils/helpers';

type Comment = {
  text: string;
  files: string[];
  id: string;
  creation_date: string;
  author?: UserAssignedWorkplace;
};

type UserAssignedWorkplace = {
  id: string;
  user: {
    email: string;
    id: string;
  };
  role: Role;
};

export const Comment: FC<Comment> = (comment: Comment) => {
  return (
    <div className={styles.Comment}>
      <div className={styles.Comment__header}>
        <img
          src="https://fikiwiki.com/uploads/posts/2022-02/1644827473_48-fikiwiki-com-p-kartinki-smeshnie-krasivie-i-milie-pro-kot-53.jpg"
          alt="Commentator's avatar"
          height="32"
          width="32"
          className={styles['Comment__header-avatar']}
        />
        <span className={styles['Comment__header-info']}>
          {comment.author?.user.email ?? 'Unknown user'} commented {getElapsedDays(new Date(comment.creation_date))}{' '}
          days ago
        </span>
      </div>
      <div className={styles.Comment__content}>{comment.text}</div>
    </div>
  );
};
