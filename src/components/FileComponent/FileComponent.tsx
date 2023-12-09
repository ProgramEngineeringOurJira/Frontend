import { FC, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { usePutRequest } from '../../hooks/usePutRequest';
import { ticketActions } from '../../redux/features/ticketSlice';
import { RootState } from '../../redux/store';
import { Button } from '../../ui-kit/Button';
import { FileIcon } from '../../ui-kit/FileIcon';
import styles from './styles.module.scss';

type FileProps = {
  file: string;
};

export const FileComponent: FC<FileProps> = ({ file }) => {
  const { idBoard, idTicket } = useParams();
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const endpoint = import.meta.env.VITE_API_ENDPOINT

  const issue = useSelector((state: RootState) => state.ticket.value);

  const { sendRequest: sendPutRequest } = usePutRequest(() => {}, `${idBoard}/issues/${idTicket}`);

  const onDeleteButtonClicked = () => {
    const newFiles = [...issue.files];
    const index = newFiles.indexOf(file, 0);
    if (index > -1) {
      newFiles.splice(index, 1);
    }
    const addFileDate = {
      files: newFiles
    };
    sendPutRequest(addFileDate);
    dispatch(ticketActions.setTicket({ ...issue, files: newFiles }));
  };

  const ref = useRef<HTMLAnchorElement | null>(null);
  const onClickedFile = () => {
    ref.current?.click()
  };

  return (
    <div className={clsx(styles.FileComponent, !isVisible ? styles.deleted : '')}>
      <div className={styles.FileComponent__header} onClick={onClickedFile}>
        <div className={styles['FileComponent__header-avatar']}>
          <FileIcon filename={file} width="40" className={styles['FileComponent__header-avatar']}/>
        </div>
        <div className={styles['FileComponent__header-container']}>
          <div className={styles['FileComponent__header-container-text']}>{file.split('/').at(-1)}</div>
          <div className={styles['FileComponent__header-container-text']}>{'.' + file.split('.').at(-1)}</div>
          <a href={ endpoint + "/v1"+file} ref={ref} target="_blank" className={styles.hidden}/>
        </div>
      </div>
      <div className={styles.FileComponent__delete}>
        <Button type="delete" text="X" onClick={onDeleteButtonClicked} />
      </div>
    </div>
  );
};
