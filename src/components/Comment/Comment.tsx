import { FC } from 'react';

import styles from './styles.module.scss';

type Comment = {
  text: string;
  files: string[];
  id: string;
  creation_date: string;
  author?: {
    id: string;
    user: {
      email: string;
      id: string;
    };
    role: 'ADMIN' | 'MEMBER' | 'GUEST';
  };
};

export const Comment: FC<Comment> = (comment: Comment) => {
  function getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.floor((endDate.getTime() - startDate.getTime()) / msInDay);
  }

  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <img
          src="https://fikiwiki.com/uploads/posts/2022-02/1644827473_48-fikiwiki-com-p-kartinki-smeshnie-krasivie-i-milie-pro-kot-53.jpg"
          alt="Commentator's avatar"
          height="32"
          width="32"
          className={styles['comment__header-avatar']}
        />
        <span className={styles['comment__header-info']}>
          {comment.author?.user.email ?? 'Unknown user'} commented{' '}
          {getDayDiff(new Date(comment.creation_date), new Date())} days ago
        </span>
      </div>
      <div className={styles.comment__content}>{comment.text}</div>
    </div>
  );
};
