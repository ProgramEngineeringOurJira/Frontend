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
import { Textarea } from '../../ui-kit/Textarea';

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
  const [personId, setPersonId] = useState('');
  const { idBoard, idSprint } = useParams();
  const currSprint = useSelector((state: RootState) => state.currSprint.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [endDate, setEndDate] = useState('');

  const postIssue = (data: any) => {
    const issueData = {
      name: name,
      text: text,
      priority: priority,
      state: state,
      label: label,
      sprint_id: idSprint,
      implementers: personId ? [personId] : [],
      end_date: endDate ? new Date(endDate) : null
    };

    if (name.length > 0 && text.length > 0) {
      const newData = currSprint.columns.map((column) => {
        if (column.name === issueData.state) {
          return {
            ...column,
            issues: [...column.issues, { ...issueData, id: data.id }]
          } as ColumnType;
        }
        return column;
      });
      dispatch(currSprintActions.setSprint({ ...currSprint, columns: newData }));
      hide();
    }
  };

  const { sendRequest, isError, isLoading, queryResult } = useSendRequest(postIssue, `${idBoard}/issues`);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issueData = {
      name: name,
      text: text,
      priority: priority,
      state: state,
      label: label,
      sprint_id: idSprint,
      implementers: personId ? [personId] : [],
      end_date: endDate ? new Date(endDate) : null
    };

    if (!name.length) setValidationError('Task title must be non-empty');
    else if (!text.length) setValidationError('Task description must be non-empty');
    else if (!state) setValidationError('State is not selected');
    else if (!label) setValidationError('Label is not selected');
    else if (!priority) setValidationError('Priority is not selected');
    else {
      sendRequest(issueData);
      setValidationError('');
    }
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
            <Textarea placeholder="Description" value={text} onChange={(e: any) => setText(e.target.value)} />
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
            <TextForm text="Implementer" />
            <Select placeholder="Choose implementer" className={styles.AddCardModal__label}>
              {users.users.map((el) => (
                <Option key={el.id} value={el.user.name} onClick={() => setPersonId(el.id)}>
                  {el.user.name}
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

          <FormElementWrapper>
            <TextForm text="End date" />
            <Input
              placeholder="End date"
              type="date"
              value={endDate}
              onChange={(e: any) => setEndDate(e.target.value)}
            />
          </FormElementWrapper>
          {validationError && <span className={styles.error}>{validationError}</span>}
          {isError && !validationError && <span className={styles.error}>{queryResult}</span>}
        </div>
        <div className={styles['AddCardModal__button-submit']}>
          <Button text="Add Task" type="primary" />
        </div>
      </form>
      <div className={styles.AddCardModal__loader}>{isLoading && <Loader />}</div>
    </>
  );
};
