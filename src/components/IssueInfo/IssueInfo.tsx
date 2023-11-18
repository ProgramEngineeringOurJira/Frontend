import { FC } from 'react';
import { SubIssue } from '../SubIssue';

import styles from './styles.module.scss';
import { Label } from '../../ui-kit/Label';
import { LabelTypes, Priority, Role, State } from '../../utils/constants';
import { getElapsedDays } from '../../utils/helpers';
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

export const IssueInfo: FC<Issue> = (issue: Issue) => {
  return (
    <div className={styles.IssueInfo}>
      <div className={styles.IssueInfo__blocks}>
        <div className={styles.IssueInfo__header}>
          <img
            src="https://fikiwiki.com/uploads/posts/2022-02/1644827473_48-fikiwiki-com-p-kartinki-smeshnie-krasivie-i-milie-pro-kot-53.jpg"
            alt="Responsible for the ticket"
            height="56"
            width="56"
            className={styles['IssueInfo__header-avatar']}
          />
          <div className={styles['IssueInfo__header-info']}>
            <span className={styles['IssueInfo__header-title']}>{issue.name}</span>
            <span className={styles['IssueInfo__header-history']}>
              Added by {issue.author?.user.email ?? 'Unknown user'} {getElapsedDays(new Date(issue.creation_date))} days
              ago.
            </span>
          </div>
        </div>
        <div className={styles.IssueInfo__mainInfo}>
          <div className={styles.IssueInfo__infoBlock}>
            <div className={clsx(styles['flex-column'], styles.keys, styles['bold-title'])}>
              <span className={styles['IssueInfo__infoBlock-element']}>State:</span>
              <span className={styles['IssueInfo__infoBlock-element']}>Priority:</span>
              <span className={styles['IssueInfo__infoBlock-element']}>Assignees:</span>
            </div>
            <div className={styles['flex-column']}>
              <span className={styles['IssueInfo__infoBlock-element']}>{issue.state}</span>
              <span className={styles['IssueInfo__infoBlock-element']}>{issue.priority}</span>
              <span className={styles['IssueInfo__infoBlock-element']}>
                {issue.implementers.length
                  ? issue.implementers
                      .reduce(function (acc: string, n) {
                        return acc + n.user.email + ', ';
                      }, '')
                      .slice(0, -2)
                  : 'No implementers'}
              </span>
            </div>
          </div>
          <div className={styles.IssueInfo__infoBlock}>
            <div className={clsx(styles['flex-column'], styles['IssueInfo__infoBlock-key'], styles['bold-title'])}>
              <span className={styles['IssueInfo__infoBlock-element']}>Issue type:</span>
              <span className={styles['IssueInfo__infoBlock-element']}>Start date:</span>
              <span className={styles['IssueInfo__infoBlock-element']}>Due date:</span>
            </div>
            <div className={styles['flex-column']}>
              <Label text={issue.label} />
              <span className={styles['IssueInfo__infoBlock-element']}>
                {new Date(issue.creation_date).toLocaleDateString()}
              </span>
              <span className={styles['IssueInfo__infoBlock-element']}>
                {new Date(issue.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.IssueInfo__horizontalLine}></div>
        <div className={styles['flex-column']}>
          <span className={styles['bold-title']}>Description</span>
          <span>{issue.text}</span>
        </div>
        <div className={styles.IssueInfo__horizontalLine}></div>
        <div className={styles['flex-column']}>
          <span className={styles['bold-title']}>Subtasks</span>
          {issue.subissues.length ? (
            issue.subissues
              .filter((issue: Issue) => issue.state !== 'Done')
              .map((issue: Issue) => <SubIssue key={issue.id} {...issue} />)
          ) : (
            <span>There are no subissues</span>
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
