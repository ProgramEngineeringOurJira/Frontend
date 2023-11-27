import { FC, FormEvent, useState } from 'react';
import { useParams } from 'react-router';

import { useSendRequest } from '../../hooks/useSendRequest';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Textarea } from '../../ui-kit/Textarea';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

type AddCommentModalProps = {
  hide: () => void;
};

export const AddCommentModal: FC<AddCommentModalProps> = ({ hide }) => {
  const [validationError, setValidationError] = useState('');
  const [text, setText] = useState('');
  const { idBoard, idIssue } = useParams();

  const postComment = (data: any) => {
    console.log(data);
    hide();
  };

  const { sendRequest, isError } = useSendRequest(postComment, `${idBoard}/issues/${idIssue}/comments`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentData = {
      text: text
    };

    if (text.length > 0) {
      sendRequest(commentData);
      setValidationError('');
      setText('');
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
            <Textarea placeholder="Comment" value={text} onChange={(value: string) => setText(value)} />
          </FormElementWrapper>
        </div>
        <div className={styles['AddCommentModal__button-submit']}>
          <Button text="Add Comment" type="primary" />
        </div>
      </form>
      {isError && <span className={styles.error}>Invalid data format</span>}
      {validationError && <span className={styles.error}>{validationError}</span>}
    </>
  );
};
