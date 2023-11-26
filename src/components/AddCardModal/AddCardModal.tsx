import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { currSprintActions } from '../../redux/features/currentSprintSlice';
import { RootState } from '../../redux/store';
import { useSendRequest } from '../../hooks/useSendRequest';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Select } from '../../ui-kit/Select';
import { Option } from '../../ui-kit/Select/Option';
import { ColumnType } from '../../utils/types';
import { labelTypes, priorityTypes, stateTypes } from '../../utils/constants';

import styles from './styles.module.scss';
import { Loader } from '../../ui-kit/Loader';

type AddCardModalProps = {
  hide: () => void;
};

export const AddCardModal: FC<AddCardModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('');
  const [state, setState] = useState('');
  const [label, setLabel] = useState('');
  const { idBoard, idSprint } = useParams();
  const currSprint = useSelector((state: RootState) => state.currSprint.value);

  const postIssue = (data: any) => {
    console.log(data);
    hide();
  };

  const { sendRequest, isError, isLoading } = useSendRequest(postIssue, `${idBoard}/issues`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issueData = {
      name: name,
      text: text,
      priority: priority,
      state: state,
      label: label,
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
        return {
          ...column,
          issues: [...column.issues, issueData]
        } as ColumnType;
      }
      return column;
    });
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
            <Input placeholder="Description" type="text" value={text} onChange={(e: any) => setText(e.target.value)} />
          </FormElementWrapper>

          <FormElementWrapper>
            <TextForm text="State" />
            <Select placeholder="Сhoose state" className={styles.AddCardModal__label}>
              {Object.entries(stateTypes).map(([key, value]) => (
                <Option key={key} value={value} onClick={() => setState(value)}>
                  {value}
                </Option>
              ))}
            </Select>
          </FormElementWrapper>

          <FormElementWrapper>
            <TextForm text="Label" />
            <Select placeholder="Choose label" className={styles.AddCardModal__label}>
              {Object.entries(labelTypes).map(([key, value]) => (
                <Option key={key} value={value} onClick={() => setLabel(key)}>
                  {value}
                </Option>
              ))}
            </Select>
          </FormElementWrapper>

          <FormElementWrapper>
            <TextForm text="Priority" />
            <Select placeholder="Choose priority" className={styles.AddCardModal__label}>
              {Object.entries(priorityTypes).map(([key]) => (
                <Option key={key} value={key} onClick={() => setPriority(key)}>
                  {key}
                </Option>
              ))}
            </Select>
          </FormElementWrapper>

        </div>
        <div className={styles['AddCardModal__button-submit']}>
          <Button text="Add Task" type="primary" />
        </div>
      </form>
      <div className={styles.AddCardModal__loader}>{isLoading && <Loader />}</div>
      {isError && <span className={styles.error}>Invalid data format</span>}
      {validationError && <span className={styles.error}>{validationError}</span>}
    </>
  );
};
