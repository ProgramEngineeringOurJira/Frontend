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
    if (password.length > 0 && email.length > 0 && validateEmail(email)) {
      sendRequest(sendObject);
      setValidationError('');
      setEmail('');
      setPassword('');
    } else {
      setValidationError('Oooops, something went wrong!');
      setEmail('');
      setPassword('');
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
            </div>

            <Button text="Sign in" type="primary" typeButton="submit" />
          </form>
          {isError && <span>{queryResult}</span>}
          {validationError && <span className={styles.error}>{validationError}</span>}
        </>
      )}
    </>
  );
};

export const Login = memo(_Login);
