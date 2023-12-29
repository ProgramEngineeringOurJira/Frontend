import { FC, FormEvent, memo, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSendRequest } from '../../hooks/useSendRequest';
import { paths } from '../../utils/paths';
import { AuthContext } from '../../shared/context';
import { Button } from '../../ui-kit/Button';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';
import { Input } from '../../ui-kit/Input';
import { Loader } from '../../ui-kit/Loader';
import { validateEmail } from '../../utils/helpers';

import styles from './styles.module.scss';

const _Login: FC = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const submitCallback = (data: any) => {
    authContext.setIsAuth(true);

    if (data) {
      authContext.setAccessToken(data['access_token']);
    }

    navigate(paths.home);
  };

  const { sendRequest, isError, isLoading, queryResult } = useSendRequest(submitCallback, 'login');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      email: email,
      password: password
    };

    if (!email) setValidationError('Enter the email');
    else if (!validateEmail(email)) setValidationError('Enter the correct email');
    else if (!password) setValidationError('Enter the password');
    else {
      sendRequest(sendObject);
      setValidationError('');
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={onSubmit} className={styles.LoginForm}>
            <div className={styles.LoginForm__wrapper}>
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
              {validationError && <span className={styles.error}>{validationError}</span>}
              {isError && !validationError && <span className={styles.error}>Invalid email or password, try again</span>}
            </div>
            <Button text="Sign in" type="primary" typeButton="submit" />
          </form>
        </>
      )}
    </>
  );
};

export const Login = memo(_Login);
