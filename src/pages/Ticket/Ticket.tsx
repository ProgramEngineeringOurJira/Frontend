import { FC, useState } from 'react';
import { Issue, Comment as CommentType } from '../../utils/types';
import issueJSON from '../../data/issue.json';

import { Header } from '../../components/Header';
import { PageLayout } from '../../components/PageLayout';
import { IssueInfo } from '../../components/IssueInfo';
import { Comment } from '../../components/Comment';
import { Modal, useModal } from '../../components/Modal';
import { AddCommentModal } from '../../components/AddCommentModal';

import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

export const Ticket: FC = () => {
  const { isShown, toggle } = useModal();
  const [editedCommentId, setEditedCommentId] = useState<string | null>(null);

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
              <Button text="Add comment" type="primary" onClick={toggle} />
            </div>
          </div>
          <IssueInfo {...issue} />
          <div className={styles.Ticket__comments}>
            <div className={styles['Ticket__comments-header']}>
              <span>Comments</span>
            </div>
            <div className={styles['Ticket__comments-content']}>
              {issue.comments.map((comment: CommentType) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  editedCommentId={editedCommentId}
                  onSetEditedCommentCallback={setEditedCommentId}
                />
              ))}
            </div>
          </div>
        </div>
        <Modal
          isShown={isShown}
          hide={toggle}
          modalContent={<AddCommentModal hide={toggle} />}
          headerText="Add comment"
        />
      </PageLayout>
    </div>
  );
};
