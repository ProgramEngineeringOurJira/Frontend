import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSendRequest } from '../../hooks/useSendRequest';
import { PageLayout } from '../../components/PageLayout';
import { paths } from '../../utils/paths';
import { Header } from '../../components/Header';
import { Button } from '../../ui-kit/Button';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';
import { Input } from '../../ui-kit/Input';

import styles from './styles.module.scss';
import { Textarea } from '../../ui-kit/Textarea';

export const CreateProject: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const submitCallback = (data: any) => {
    console.log(data);
    navigate(paths.home);
  };

  const { sendRequest, isError, queryResult } = useSendRequest(submitCallback, 'workplace');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendObject = {
      name: name,
      description: description
    };
    if (name.length) {
      sendRequest(sendObject);
      setValidationError('');
    } else {
      setValidationError('Project name must be non-empty');
    }
  };

  return (
    <div>
      <Header isInformationVisible={false} isCreateSprintVisible={false} />
      <PageLayout>
        <>
          <form onSubmit={onSubmit} className={styles.CreateProject}>
            <span className={styles['CreateProject__title']}>Create new project</span>
            <FormElementWrapper>
              <TextForm text="Name" />
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
            </FormElementWrapper>
            <FormElementWrapper>
              <TextForm text="Description" />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
              />
            </FormElementWrapper>
            {validationError && <span className={styles.error}>{validationError}</span>}
            {isError && !validationError && <span className={styles.error}>{queryResult}</span>}
            <Button text="Create Project" type="primary" typeButton="submit" />
          </form>
        </>
      </PageLayout>
    </div>
  );
};
