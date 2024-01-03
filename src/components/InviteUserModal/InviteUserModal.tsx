import { FC, FormEvent, useState } from 'react';
import { useParams } from 'react-router';

import { useSendRequest } from '../../hooks/useSendRequest';
import { Input } from '../../ui-kit/Input';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Button } from '../../ui-kit/Button';
import { validateEmail } from '../../utils/helpers';

import styles from './styles.module.scss';

type InviteUserModalProps = {
  hide: () => void;
};

export const InviteUserModal: FC<InviteUserModalProps> = ({ hide }) => {
  const [validationError, setValidationError] = useState('');
  const [email, setEmail] = useState('');
  const { idBoard } = useParams();

  const postComment = () => {
    hide();
  };

  const { sendRequest, isError } = useSendRequest(postComment, `workplaces/${idBoard}/invite`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      email: email
    };

    if (email.length > 0 && validateEmail(email)) {
      sendRequest(sendObject);
      setValidationError('');
    } else {
      setValidationError('Enter the correct email');
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.InviteUserModal}>
          <FormElementWrapper>
            <TextForm text="Email" />
            <Input
              type="text"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
          </FormElementWrapper>
          {validationError && <span className={styles.error}>{validationError}</span>}
          {isError && !validationError && <span className={styles.error}>No specified registered user</span>}
        </div>
        <div className={styles['InviteUserModal__button-submit']}>
          <Button text="Invite" type="primary" typeButton="submit" />
        </div>
      </form>
    </>
  );
};
