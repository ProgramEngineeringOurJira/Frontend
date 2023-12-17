import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';

import { useDeleteRequest } from '../../hooks/useDeleteRequest';
import { usePutRequest } from '../../hooks/usePutRequest';
import { Button } from '../../ui-kit/Button';
import { Input } from '../../ui-kit/Input';
import { Avatar } from '../../ui-kit/Avatar';
import { getElapsedDays } from '../../utils/helpers';
import { Comment as CommentType } from '../../utils/types';

import styles from './styles.module.scss';

type CommentProps = {
  comment: CommentType;
  editedCommentId: string | null;
  onSetEditedCommentCallback: (value: string | null) => void;
};

export const Comment: FC<CommentProps> = ({ comment, editedCommentId, onSetEditedCommentCallback }) => {
  const { idBoard } = useParams();
  const [text, setText] = useState(comment.text);
  const [isVisible, setIsVisible] = useState(true);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  useEffect(() => {
    if (isSaveButtonClicked) {
      setIsSaveButtonClicked(false);
    } else {
      setText(comment.text);
    }
  }, [editedCommentId]);

  const deleteRequest = useDeleteRequest(`${idBoard}/comments/${comment.id}`);

  const onDeleteButtonClicked = () => {
    deleteRequest.sendRequest(null);
    if (comment.id) {
      setIsVisible(false);
    }
  };

  const putComment = (data: any) => {
    console.log(data);
  };

  const putRequest = usePutRequest(putComment, `${idBoard}/comments/${comment.id}`);

  const onSaveButtonClicked = () => {
    const commentData = {
      text: text
    };
    if (text.length > 0) {
      putRequest.sendRequest(commentData);
      onSetEditedCommentCallback(null);
      setIsSaveButtonClicked(true);
    }
  };

  const onClickedComment = () => {
    setText(comment.text);
    onSetEditedCommentCallback(comment.id);
  };

  const onCancelButtonClicked = () => {
    setText(comment.text);
    onSetEditedCommentCallback(null);
  };

  const isEditing: boolean = editedCommentId === comment.id;

  return (
    <div className={clsx(styles.Comment, !isVisible ? styles.deleted : '')}>
      <div className={styles.Comment__header}>
        <Avatar avatarUrl={comment.author.user.avatar_url} width={32}></Avatar>
        <span className={styles['Comment__header-info']}>
          {comment.author.user.name} commented {getElapsedDays(new Date(comment.creation_date))} days ago
        </span>
      </div>
      <div className={styles.Comment__content}>
        <div className={styles['Comment__content-flex']}>
          {!isEditing ? (
            <div className={styles['Comment__content-text']} onClick={onClickedComment}>
              {text}
            </div>
          ) : (
            <>
              <Input
                value={text}
                placeholder=""
                type="text"
                onChange={(e: any) => {
                  setText(e.target.value);
                }}
              ></Input>
              {text && <Button text="Save" type="primary" onClick={onSaveButtonClicked} />}
              <Button text="Cancel" type="primary" onClick={onCancelButtonClicked} />
            </>
          )}
        </div>

        {<Button text="Delete" type="delete" onClick={onDeleteButtonClicked} />}
      </div>
    </div>
  );
};
