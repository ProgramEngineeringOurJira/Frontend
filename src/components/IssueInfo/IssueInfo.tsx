import { FC } from 'react';
import { SubIssue } from '../SubIssue';

import styles from './styles.module.scss';
import { Label } from '../../ui-kit/Label';

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

export const IssueInfo: FC<Issue> = (issue: Issue) => {
  function getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.floor((endDate.getTime() - startDate.getTime()) / msInDay);
  }

  let implementers: string = '';
  issue.implementers.map((user: UserAssignedWorkplace) => (implementers += user.user.email + ', '));

  return (
    <div className={styles['issue-info']}>
      <div className={styles['issue-info__blocks']}>
        <div className={styles['issue-header']}>
          <img
            src="https://fikiwiki.com/uploads/posts/2022-02/1644827473_48-fikiwiki-com-p-kartinki-smeshnie-krasivie-i-milie-pro-kot-53.jpg"
            alt="Responsible for the ticket"
            height="56"
            width="56"
            className={styles['issue-header__avatar']}
          />
          <div className={styles['issue-header__info']}>
            <span className={styles['issue-title']}>{issue.name}</span>
            <span className={styles['issue-history']}>
              Added by {issue.author?.user.email ?? 'Unknown user'}{' '}
              {getDayDiff(new Date(issue.creation_date), new Date())} days ago.
            </span>
          </div>
        </div>
        <div className={styles['issue-main-info']}>
          <div className={styles['info-block']}>
            <div className={styles['flex-column'] + ' ' + styles['keys'] + ' ' + styles['bold-title']}>
              <span className={styles['info-block__element']}>State:</span>
              <span className={styles['info-block__element']}>Priority:</span>
              <span className={styles['info-block__element']}>Assignees:</span>
            </div>
            <div className={styles['flex-column']}>
              <span className={styles['info-block__element']}>{issue.state}</span>
              <span className={styles['info-block__element']}>{issue.priority}</span>
              <span className={styles['info-block__element']}>
                {issue.implementers.length ? implementers.slice(0, -2) : 'No implementers'}
              </span>
            </div>
          </div>
          <div className={styles['info-block']}>
            <div className={styles['flex-column'] + ' ' + styles['keys'] + ' ' + styles['bold-title']}>
              <span className={styles['info-block__element']}>Issue type:</span>
              <span className={styles['info-block__element']}>Start date:</span>
              <span className={styles['info-block__element']}>Due date:</span>
            </div>
            <div className={styles['flex-column']}>
              <Label text={issue.label} />
              <span className={styles['info-block__element']}>
                {new Date(issue.creation_date).toLocaleDateString()}
              </span>
              <span className={styles['info-block__element']}>{new Date(issue.end_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className={styles['horizontal-line']}></div>
        <div className={styles['flex-column']}>
          <span className={styles['bold-title']}>Description</span>
          <span>{issue.text}</span>
        </div>
        <div className={styles['horizontal-line']}></div>
        <div className={styles['flex-column']}>
          <span className={styles['bold-title']}>Subtasks</span>
          {issue.subissues.length ? (
            issue.subissues
              .filter((issue: Issue) => issue.state !== 'Done')
              .map((issue: Issue) => <SubIssue key={issue.id} {...issue} />)
          ) : (
            <span>Подзадач нет</span>
          )}
        </div>
        <div className="flex-column">
          {issue.subissues
            .filter((issue: Issue) => issue.state === 'Done')
            .map((issue: Issue) => (
              <SubIssue key={issue.id} {...issue} />
            ))}
        </div>
      </div>
    </div>
  );
};
