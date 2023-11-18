import { FC } from 'react';
import issueJSON from '../../data/issue.json';

import { Header } from '../../components/Header';
import { PageLayout } from '../../components/PageLayout';
import { IssueInfo } from '../../components/IssueInfo';
import { Comment } from '../../components/Comment';
import { Button } from '../../ui-kit/Button';
import { LabelTypes, Priority, Role, State } from '../../utils/constants';

import styles from './styles.module.scss';

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
  comments: Comment[];
  subissues: Issue[];
};

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

export const Ticket: FC = () => {
  const issueJSONobj = JSON.stringify(issueJSON);
  const issue: Issue = JSON.parse(issueJSONobj);

  return (
    <div className={styles.Ticket}>
      <Header />
      <PageLayout>
        <div className={styles.Ticket__blocks}>
          <div className={styles.Ticket__top}>
            <div>
              <span className={styles['Ticket__top-projectName']}>Project name</span>
            </div>
            <div className={styles['Ticket__top-controls']}>
              <Button text="Edit" type="primary" />
              <Button text="Comment" type="primary" />
            </div>
          </div>
          <IssueInfo {...issue} />
          <div className={styles.Ticket__comments}>
            <div className={styles['Ticket__comments-header']}>
              <span>Comments</span>
            </div>
            <div className={styles['Ticket__comments-content']}>
              {issue.comments.map((comment: Comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};
