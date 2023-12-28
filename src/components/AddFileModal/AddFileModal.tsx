import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useSendRequest } from '../../hooks/useSendRequest';
import { usePutRequest } from '../../hooks/usePutRequest';
import { RootState } from '../../redux/store';
import { ticketActions } from '../../redux/features/ticketSlice';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Button } from '../../ui-kit/Button';
import { InputFile } from '../../ui-kit/InputFile';

import styles from './styles.module.scss';

type AddFileModalProps = {
  hide: () => void;
};

export const AddFileModal: FC<AddFileModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState('');
  const [file, setFile] = useState<File>();
  const { idBoard, idTicket } = useParams();
  const issue = useSelector((state: RootState) => state.ticket.value);

  const { sendRequest: sendPutRequest, isError: isPutError } = usePutRequest(() => {}, `${idBoard}/issues/${idTicket}`);
  const postFile = (data: any) => {
    const newFiles = [...issue.files, data.url];
    const addFileDate = {
      files: newFiles
    };
    sendPutRequest(addFileDate);
    dispatch(ticketActions.setTicket({ ...issue, files: newFiles }));
    hide();
  };

  const { sendRequest, isError, queryResult } = useSendRequest(postFile, `workplaces/${idBoard}/file`, true);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file != null) {
      const formData: FormData = new FormData();
      formData.append('file_to_upload', file, file.name);
      sendRequest(formData);
      setValidationError('');
    } else {
      setValidationError('No files pinned.');
    }
  };
  const onChange = (e: any) => {
    var file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.AddFileModal}>
          <FormElementWrapper>
            <InputFile onChange={onChange} />
          </FormElementWrapper>
          {validationError && <span className={styles.error}>{validationError}</span>}
          {isError && !validationError && <span className={styles.error}>{queryResult}</span>}
        </div>
        <div className={styles['AddFileModal__button-submit']}>
          <Button text="Add File" type="primary" />
        </div>
      </form>
    </>
  );
};
