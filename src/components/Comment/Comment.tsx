import { FC, useState } from 'react';
import { useParams } from 'react-router';

import { useDeleteRequest } from '../../hooks/useDeleteRequest';
import { usePutRequest } from '../../hooks/usePutRequest';
import { Button } from '../../ui-kit/Button';
import { Input } from '../../ui-kit/Input';
import { getElapsedDays } from '../../utils/helpers';
import { Comment as CommentType } from '../../utils/types';

import styles from './styles.module.scss';

type CommentProps = {
  comment: CommentType;
  editCommentId: string | null;
  onEditCommentCallback: (value: string | null) => void;
};

export const Comment: FC<CommentProps> = ({ comment, editCommentId, onEditCommentCallback }) => {
  const { idBoard } = useParams();
  const [text, setText] = useState(comment.text);

  const deleteRequest = useDeleteRequest(`${idBoard}/comments/${comment.id}`);

  const onDelete = () => {
    deleteRequest.sendRequest(null);
  };

  const putComment = (data: any) => {
    console.log(data);
  };

  const putRequest = usePutRequest(putComment, `${idBoard}/comments/${comment.id}`);

  const onEdit = () => {
    putRequest.sendRequest(text);
  };

  const isEditing: boolean = editCommentId === comment.id;

  return (
    <div className={styles.Comment}>
      <div className={styles.Comment__header}>
        <img
          src="https://fikiwiki.com/uploads/posts/2022-02/1644827473_48-fikiwiki-com-p-kartinki-smeshnie-krasivie-i-milie-pro-kot-53.jpg"
          alt="Commentator's avatar"
          height="32"
          width="32"
          className={styles['Comment__header-avatar']}
        />
        <span className={styles['Comment__header-info']}>
          {comment.author.user.name} commented {getElapsedDays(new Date(comment.creation_date))} days ago
        </span>
      </div>
      <div className={styles.Comment__content}>
        <div className={styles['Comment__content-flex']}>
          {!isEditing ? (
            <div
              className={styles['Comment__content-text']}
              onClick={() => {
                onEditCommentCallback(comment.id);
              }}
            >
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
              <Button text="Save" type="primary" onClick={onEdit} />
              <Button
                text="Cancel"
                type="primary"
                onClick={() => {
                  onEditCommentCallback(null);
                }}
              />
            </>
          )}
        </div>

        <Button text="Delete" type="delete" onClick={onDelete} />
      </div>
    </div>
  );
};
