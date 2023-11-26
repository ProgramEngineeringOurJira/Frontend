import { FC } from 'react';
import clsx from 'clsx';
import { Issue } from '../../utils/types';

import styles from './styles.module.scss';

export const SubIssue: FC<Issue> = (issue) => {
  return (
    <div className={styles.Subissue}>
      <span className={styles.Subissue__title}>
        <span className={clsx(styles['blue-text'], styles['bold-title'])}>Issue {issue.id}: </span>
        {issue.name}
      </span>
      <div className={styles.Subissue__info}>
        <span className={styles['Subissue__info-element']}>{issue.state}</span>
        <span className={styles['Subissue__info-element']}>{new Date(issue.creation_date).toLocaleDateString()}</span>
        <span className={styles['Subissue__info-element']}>{new Date(issue.end_date).toLocaleDateString()}</span>
        <span className={styles['Subissue__info-element']}>{issue.author.user.name}</span>
      </div>
    </div>
  );
};
