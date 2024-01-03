import { FC, FormEvent, memo, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { useSendRequest } from '../../hooks/useSendRequest';
// import { paths } from '../../utils/paths';
// import { AuthContext } from '../../shared/context';
import { Button } from '../../ui-kit/Button';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';

import styles from './styles.module.scss';
import { Input } from '../../ui-kit/Input';
import { validateEmail } from '../../utils/helpers';

type RegistrationProps = {
  onSetIsLoginCallback: (value: boolean) => void;
};

const _Registration: FC<RegistrationProps> = ({ onSetIsLoginCallback }) => {
  // const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  // const navigate = useNavigate();

  const submitCallback = () => {
    if (!isError) {
      // authContext?.setIsAuth(true);
      // navigate(paths.home);
      onSetIsLoginCallback(true);
    }
  };

  const { sendRequest, isError, isLoading, isSuccess } = useSendRequest(submitCallback, 'register');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      email: email,
      name: name,
      password: password
    };

    if (!email.length || !validateEmail(email)) setValidationError('Enter the correct email');
    else if (!name) setValidationError('Name must be non-empty');
    else if (name.length > 20) setValidationError('Name must not exceed 20 characters');
    else if (!password) setValidationError('Password must be non-empty');
    else if (!confirmPassword) setValidationError('Confirm Password must be non-empty');
    else if (password !== confirmPassword) setValidationError('Entered passwords are different!');
    else {
      sendRequest(sendObject);
      setValidationError('');
    }
  };

  return (
    <>
      {isLoading ? (
        <span>Загрузка...</span>
      ) : (
        <>
          <form onSubmit={onSubmit} className={styles.RegistrationForm}>
            <div className={styles.RegistrationForm__wrapper}>
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
                <TextForm text="Name" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
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
                <TextForm text="Confirm Password" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e: any) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </FormElementWrapper>
              {validationError && <span className={styles.error}>{validationError}</span>}
              {isError && !validationError && <span className={styles.error}>Invalid data format</span>}
            </div>

            <Button text="Sign up" type="primary" typeButton="submit" />
          </form>
        </>
      )}
    </>
  );
};

export const Registration = memo(_Registration);
