import { FC, useEffect, useState } from 'react';
import { Comment as CommentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { FileComponent } from '../../components/FileComponent';
import { useGetRequest } from '../../hooks/useGetRequest';
import { RootState } from '../../redux/store';
import { ticketActions } from '../../redux/features/ticketSlice';
import { Header } from '../../components/Header';
import { PageLayout } from '../../components/PageLayout';
import { IssueInfo } from '../../components/IssueInfo';
import { Comment } from '../../components/Comment';
import { Modal, useModal } from '../../components/Modal';
import { AddCommentModal } from '../../components/AddCommentModal';
import { AddFileModal } from '../../components/AddFileModal';

import { Button } from '../../ui-kit/Button';
import { IconButton } from '../../ui-kit/IconButton';

import styles from './styles.module.scss';

export const Ticket: FC = () => {
  const { isShown: isShownFile, toggle: toggleFile } = useModal();
  const { isShown: isShownComment, toggle: toggleComment } = useModal();
  const [editedCommentId, setEditedCommentId] = useState<string | null>(null);

  const { idBoard, idTicket } = useParams();
  const dispatch = useDispatch();

  const issue = useSelector((state: RootState) => state.ticket.value);

  const { data: issueData, isLoading: isIssueLoading } = useGetRequest(`${idBoard}/issues/${idTicket}`);

  useEffect(() => {
    if (issueData && !isIssueLoading) {
      dispatch(ticketActions.setTicket(issueData));
    }
  }, [issueData, isIssueLoading]);

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
              <Button text="Add comment" type="primary" onClick={toggleComment} />
              <IconButton text="" type="icon" iconPath="paper_clip" iconColor={'#FFFFFF'} onClick={toggleFile} />
            </div>
          </div>
          <IssueInfo {...issue} />
          <div className={styles.Ticket__files}>
            <div className={styles['Ticket__files-header']}>
              <span>Files</span>
            </div>
            <div className={styles['Ticket__files-content']}>
              {issue.files.map((file: string) => (
                <FileComponent file={file} />
              ))}
            </div>
          </div>
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
          isShown={isShownComment}
          hide={toggleComment}
          modalContent={<AddCommentModal hide={toggleComment} />}
          headerText="Add comment"
        />
        <Modal
          isShown={isShownFile}
          hide={toggleFile}
          modalContent={<AddFileModal hide={toggleFile} />}
          headerText="Add file"
        />
      </PageLayout>
    </div>
  );
};
