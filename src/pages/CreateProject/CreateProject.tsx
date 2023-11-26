import { FC, FormEvent,useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSendRequest } from '../../hooks/useSendRequest';
import { PageLayout } from '../../components/PageLayout';
import { paths } from '../../utils/paths';
import { Header } from '../../components/Header';
import { Button } from '../../ui-kit/Button';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';
import { Input } from '../../ui-kit/Input';

import { AuthContext } from '../../shared/context';

import styles from './styles.module.scss';

export const CreateProject: FC = () => {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const submitCallback = (data: any) => {
    // authContext.setIsAuth(true);

    // if (data) {
    //   authContext.setAccessToken(data['access_token']);
    // }

    navigate(paths.home);
  };

  const { sendRequest, isError, isLoading, queryResult, isSuccess } = useSendRequest(submitCallback, 'workplace');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      name: name,
      description: description
    };
    if (name.length > 0) {
      sendRequest(sendObject);
      setValidationError('');
      setName('');
      setDescription('');
    } else {
      setValidationError('Oooops, something went wrong!');
      setName('');
      setDescription('');
    }
  };

  return (
    <div>
      <Header />
      <PageLayout>
        <>
          <form onSubmit={onSubmit} className={styles.CreateProject}>
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
              <TextForm text="Description" />
              <Input
                type="text"
                value={description}
                onChange={(e: any) => {
                  setDescription(e.target.value);
                }}
              />
            </FormElementWrapper>
            <Button text="Create Project" type="primary" typeButton="submit" />
          </form>
          {isError && <span>{queryResult}</span>}
          {validationError && <span className={styles.error}>{validationError}</span>}
        </>
      </PageLayout>
    </div>
  );
};
