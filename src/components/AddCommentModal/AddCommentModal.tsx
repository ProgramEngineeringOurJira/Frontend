import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useSendRequest } from '../../hooks/useSendRequest';
import { RootState } from '../../redux/store';
import { ticketActions } from '../../redux/features/ticketSlice';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Textarea } from '../../ui-kit/Textarea';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

type AddCommentModalProps = {
  hide: () => void;
};

export const AddCommentModal: FC<AddCommentModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState('');
  const [text, setText] = useState('');
  const { idBoard, idTicket } = useParams();
  const issue = useSelector((state: RootState) => state.ticket.value);

  const postComment = (data: any) => {
    const commentRenderedData = {
      id: data.id,
      text: text,
      creation_date: new Date().getTime(),
      author: {
        user: {
          name: 'You'
        }
      }
    };
    const newComments = [...issue.comments, commentRenderedData];
    dispatch(ticketActions.setTicket({ ...issue, comments: newComments }));

    hide();
  };

  const { sendRequest, isError } = useSendRequest(postComment, `${idBoard}/issues/${idTicket}/comments`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentData = {
      text: text
    };

    if (text.length > 0) {
      sendRequest(commentData);
      setValidationError('');
      // setText('');
    } else {
      setValidationError('Comment text must be non-empty');
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.AddCommentModal}>
          <FormElementWrapper>
            <TextForm text="Comment" />
            <Textarea placeholder="Comment" value={text} onChange={(e: any) => setText(e.target.value)} />
          </FormElementWrapper>
        </div>
        <div className={styles['AddCommentModal__button-submit']}>
          <Button text="Add Comment" type="primary" />
        </div>
      </form>
      {isError && !validationError && <span className={styles.error}>Invalid data format</span>}
      {validationError && <span className={styles.error}>{validationError}</span>}
    </>
  );
};
