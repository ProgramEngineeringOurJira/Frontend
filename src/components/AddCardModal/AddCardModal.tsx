import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik, FormikHelpers, useField, useFormik } from 'formik';

import columnsSlice from '../../redux/features/columns/columnsSlice';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';
import { useSendRequest } from '../../hooks/useSendRequest';
import { useParams } from 'react-router';
import { ColumnType, Issue } from '../../utils/types';
import currentSprintSlice, { currSprintActions } from '../../redux/features/currentSprintSlice';
import { RootState } from '../../redux/store';

type AddCardModalProps = {
  hide: () => void;
};

export const AddCardModal: FC<AddCardModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  // TODO убрать строку, поставить enum
  const [priority, setPriority] = useState('');
  // TODO убрать строку, поставить enum
  const [state, setState] = useState('');
  // TODO убрать строку, поставить enum
  const [label, setLabel] = useState('');
  const { idBoard, idSprint } = useParams();
  const currSprint = useSelector((state: RootState) => state.currSprint.value);

  const postIssue = (data: any) => {
    console.log(data);
    hide();
  };

  const { sendRequest, isError, isLoading, queryResult } = useSendRequest(postIssue, `${idBoard}/issues`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issueData = {
      name: name,
      text: text,
      priority: 'LOW',
      state: 'Backlog',
      label: 'devops',
      sprint_id: idSprint,
      implementers: []
    };

    if (name.length > 0) {
      sendRequest(issueData);
      setValidationError('');
      setName('');
      setText('');
      setPriority('');
      setState('');
      setLabel('');
    } else {
      setValidationError('Oooops, something went wrong!');
    }

    sendRequest(issueData);

    const newData = currSprint.columns.map((column) => {
      if (column.name === issueData.state) {
        return ({
          ...column,
          issues: [...column.issues, issueData]
        } as ColumnType)
      }
      return column;
    })
    dispatch(currSprintActions.setSprint({ ...currSprint, columns: newData }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.AddCardModal}>
          <FormElementWrapper>
            <TextForm text="Title" />
            <Input
              placeholder="Title"
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
              placeholder="Description"
              type="text"
              value={text}
              onChange={(e: any) => setText(e.target.value)}
            />
          </FormElementWrapper>
        </div>
        <div className={styles['AddCardModal__button-submit']}>
          <Button text="Add Task" type="primary" />
        </div>
      </form>
      {isError && <span>{queryResult}</span>}
      {validationError && <span className={styles.error}>{validationError}</span>}
    </>
  );
};
