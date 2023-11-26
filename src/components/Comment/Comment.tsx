import { FC } from 'react';
import { Comment as CommentType } from '../../utils/types';

import { getElapsedDays } from '../../utils/helpers';

import styles from './styles.module.scss';

export const Comment: FC<CommentType> = (comment) => {
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
          {comment.author.user.name} commented {getElapsedDays(new Date(comment.creation_date))} days ago
        </span>
      </div>
      <div className={styles.Comment__content}>{comment.text}</div>
    </div>
  );
};
