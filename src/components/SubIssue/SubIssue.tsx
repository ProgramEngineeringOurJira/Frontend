import { FC } from 'react';

import styles from './styles.module.scss';

type Issue = {
  name: string;
  text: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGRENT';
  state: 'Backlog' | 'To do' | 'In Progress' | 'In Review' | 'QA' | 'Done';
  id: string;
  creation_date: string;
  end_date: string;
  label: 'frontend' | 'backend' | 'devops' | 'qa' | 'design' | 'other';
  author?: {
    id: string;
    user: {
      email: string;
      id: string;
    };
    role: 'ADMIN' | 'MEMBER' | 'GUEST';
  };
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
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
};

export const SubIssue: FC<Issue> = (issue: Issue) => {
  return (
    <div className={styles.subissue}>
      <span className={styles.subissue__title}>
        <span className={styles['blue-text'] + ' ' + styles['bold-title']}>Issue {issue.id}: </span>
        {issue.name}
      </span>
      <div className={styles.subissue__info}>
        <span className={styles['subissue__info-element']}>{issue.state}</span>
        <span className={styles['subissue__info-element']}>{new Date(issue.creation_date).toLocaleDateString()}</span>
        <span className={styles['subissue__info-element']}>{new Date(issue.end_date).toLocaleDateString()}</span>
        <span className={styles['subissue__info-author']}>{issue.author?.user.email ?? 'Unknown user'}</span>
      </div>
    </div>
  );
};
