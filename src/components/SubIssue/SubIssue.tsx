import { FC } from 'react';

import styles from './styles.module.scss';
import { LabelTypes, Priority, Role, State } from '../../utils/constants';
import clsx from 'clsx';

type Issue = {
  name: string;
  text: string;
  priority: Priority;
  state: State;
  id: string;
  creation_date: string;
  end_date: string;
  label: LabelTypes;
  author?: UserAssignedWorkplace;
  implementers: UserAssignedWorkplace[];
  comments: {
    text: string;
    files: string[];
    id: string;
    creation_date: string;
    author?: UserAssignedWorkplace;
  }[];
  subissues: Issue[];
};

type UserAssignedWorkplace = {
  id: string;
  user: {
    email: string;
    id: string;
  };
  role: Role;
};

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
        <span className={styles['Subissue__info-element']}>{issue.author?.user.email ?? 'Unknown user'}</span>
      </div>
    </div>
  );
};
