import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useNavigate } from 'react-router-dom';
import { useGetRequest } from '../../hooks/useGetRequest';
import { currSprintActions } from '../../redux/features/currentSprintSlice';
import { sprintsActions } from '../../redux/features/sprintSlice';
import { RootState } from '../../redux/store';
import { useSendRequest } from '../../hooks/useSendRequest';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';
import { Loader } from '../../ui-kit/Loader';

import styles from './styles.module.scss';

type AddCardModalProps = {
  hide: () => void;
};

export const AddSprintModal: FC<AddCardModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { idBoard, idSprint } = useParams();
  const sprints = useSelector((state: RootState) => state.sprint.value);
  const navigate = useNavigate();

  const postSprint = (data: any) => {
    const sprintData = {
      name: name,
      start_date: startDate,
      end_date: endDate,
      id: data.id,
      columns: []
    };

    dispatch(sprintsActions.setSprints({ ...sprints, sprintData }));

    hide();
    navigate(`/board/${idBoard}/sprint/${data.id}`);
  };

  const { sendRequest, isError, isLoading } = useSendRequest(postSprint, `${idBoard}/sprints`);
  const { data: currentSprintData, isLoading: isCurrentSprintLoading } = useGetRequest(
    `${idBoard}/sprints/${idSprint}/issues`
  );

  useEffect(() => {
    if (currentSprintData && !isCurrentSprintLoading) {
      dispatch(currSprintActions.setSprint(currentSprintData));
    }
  }, [currentSprintData, isCurrentSprintLoading, idSprint]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issueData = {
      name: name,
      start_date: new Date(startDate),
      end_date: new Date(endDate)
    };

    if (name.length > 0 && startDate.length > 0 && endDate.length > 0) {
      sendRequest(issueData);
      setValidationError('');
      setName('');
      setStartDate('');
      setEndDate('');
    } else {
      setValidationError('Oooops, something went wrong!');
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
            <TextForm text="Start date" />
            <Input
              placeholder="Start date"
              type="date"
              value={startDate}
              onChange={(e: any) => setStartDate(e.target.value)}
            />
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
        </div>
        <div className={styles['AddCardModal__button-submit']}>
          <Button text="Add Sprint" type="primary" />
        </div>
      </form>
      <div className={styles.AddCardModal__loader}>{isLoading && <Loader />}</div>
      {isError && <span className={styles.error}>Invalid data format</span>}
      {validationError && <span className={styles.error}>{validationError}</span>}
    </>
  );
};
