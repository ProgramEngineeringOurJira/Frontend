import { FC, FormEvent, memo, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSendRequest } from '../../hooks/useSendRequest';
import { paths } from '../../utils/paths';
import { AuthContext } from '../../shared/context';
import { Button } from '../../ui-kit/Button';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';

import styles from './styles.module.scss';
import { Input } from '../../ui-kit/Input';
import { validateEmail } from '../../utils/helpers';

const _Registration: FC = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const submitCallback = () => {
    if (isSuccess) {
      authContext?.setIsAuth(true);
      navigate(paths.home);
    }
  };

  const { sendRequest, isError, isLoading, queryResult, isSuccess } = useSendRequest(submitCallback, 'register');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      email: email,
      password: password
    };

    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      email.length > 0 &&
      password === confirmPassword &&
      validateEmail(email)
    ) {
      sendRequest(sendObject);
      setValidationError('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setValidationError('Oooops, something went wrong!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <>
      {isLoading ? (
        <span>Загрузка...</span>
      ) : (
        <>
          <form onSubmit={onSubmit} className={styles.RegistrationForm}>
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

            <FormElementWrapper>
              <TextForm text="Password" />
              <Input
                type="password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </FormElementWrapper>

            <FormElementWrapper>
              <TextForm text="confirmPassword" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e: any) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormElementWrapper>

            <Button text="Sign up" type="primary" typeButton="submit" />
          </form>
          {isError && <span>{queryResult}</span>}
          {validationError && <span className={styles.error}>{validationError}</span>}
        </>
      )}
    </>
  );
};

export const Registration = memo(_Registration);
