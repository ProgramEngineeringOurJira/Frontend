import { FC } from 'react';
import { Issue } from '../../utils/types';
import clsx from 'clsx';

import { Label } from '../../ui-kit/Label';
import { Avatar } from '../../ui-kit/Avatar';
import { getElapsedDays } from '../../utils/helpers';

import styles from './styles.module.scss';

export const IssueInfo: FC<Issue> = (issue) => {
  return (
    <div className={styles.IssueInfo}>
      <div className={styles.IssueInfo__blocks}>
        <div className={styles.IssueInfo__header}>
          <Avatar avatarUrl={issue.author.user.avatar_url} width={56}></Avatar>
          <div className={styles['IssueInfo__header-info']}>
            <span className={styles['IssueInfo__header-title']}>{issue.name}</span>
            {issue.author.user.name ? (
              <span className={styles['IssueInfo__header-history']}>
                Added by {issue.author.user.name}{' '}
                {issue.creation_date ? getElapsedDays(new Date(issue.creation_date)) : 0} days ago.
              </span>
            ) : issue.creation_date ? (
              <span>Added {getElapsedDays(new Date(issue.creation_date))} days ago.</span>
            ) : (
              <></>
            )}
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
                        return acc + n.user.name + ', ';
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
                {issue.creation_date ? new Date(issue.creation_date).toLocaleDateString() : '-'}
              </span>
              <span className={styles['IssueInfo__infoBlock-element']}>
                {issue.end_date ? new Date(issue.end_date).toLocaleDateString() : '-'}
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
          {/* {issue.subissues.length ? (
            issue.subissues
              .filter((issue: Issue) => issue.state !== 'Done')
              .map((issue: Issue) => <SubIssue key={issue.id} {...issue} />)
          ) : (
            <span>There are no subissues</span>
          )} */}
        </div>
        {/* <div className="flex-column">
          {issue.subissues
            .filter((issue: Issue) => issue.state === 'Done')
            .map((issue: Issue) => (
              <SubIssue key={issue.id} {...issue} />
            ))}
        </div> */}
      </div>
    </div>
  );
};
