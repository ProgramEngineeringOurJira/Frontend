import { FC, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { usePutRequest } from '../../hooks/usePutRequest';
import { Icon } from '../../ui-kit/Icon';
import { priorityTypes, State } from '../../utils/constants';
import { Label } from '../../ui-kit/Label/Label';
import { Avatar } from '../../ui-kit/Avatar'
import { formatDateForCard } from '../../utils/helpers';
import { Issue } from '../../utils/types';
import { paths } from '../../utils/paths';

import styles from './styles.module.scss';;

type CardProps = {
  issue: Issue;
  draggedIssue: { id: string | null; state: State | null };
  onSetDraggedIssueCallback: (value: { id: string | null; state: State | null }) => void;
  isVisible: boolean;
};

export const Card: FC<CardProps> = ({ issue, draggedIssue, onSetDraggedIssueCallback, isVisible }) => {
  const { idBoard, idSprint } = useParams();

  const documentsCount = issue.files.length;

  function getIconName(priority: string) {
    if (priority === priorityTypes.HIGH || priority === priorityTypes.URGRENT) {
      return '#ff0000';
    } else if (priority === priorityTypes.NORMAL) {
      return '#ffa500';
    } else return '#76cc8e';
  }

  const putIssue = (data: any) => {
    console.log(data);
  };

  const { sendRequest } = usePutRequest(putIssue, `${idBoard}/issues/${draggedIssue.id}`);

  useEffect(() => {
    onDragged();
  }, [draggedIssue]);

  const onDragged = () => {
    if (draggedIssue.id == issue.id && draggedIssue.state != null && draggedIssue.state != issue.state) {
      const issueData = {
        state: draggedIssue.state
      };
      sendRequest(issueData);
      onSetDraggedIssueCallback({
        id: null,
        state: null
      });
    }
  };

  return (
    <Link to={`${paths.board}/${idBoard}${paths.sprint}/${idSprint}${paths.ticket}/${issue.id}`}>
      <div className={clsx(styles.Card, !isVisible ? styles.hide : '')}>
        <h3 className={styles.Card__header}>{issue.name}</h3>
        <p className={styles.Card__description}>{issue.text}</p>
        <Label text={issue.label} />
        <div className={styles.Card__line} />
        <div className={styles.Card__bottom}>
          <div className={styles['Card__bottom-icons']}>
            <div className={styles.Card__bottom_documentsWrapper}>
              <Icon iconName="paper_clip" color={documentsCount > 0 ? '#1D2D35' : '#C4C4C4'} />
              {documentsCount > 0 && <span className={styles.Card__bottom_documentsCount}>{documentsCount}</span>}
            </div>

            <Icon iconName="flag" color={getIconName(issue.priority)} />

            <div className={styles.Card_time_wrapper}>
              <Icon className={styles.Card_time_clock_icon} iconName="clock" />
              <div className={styles.Card_time_date}>{formatDateForCard(issue.end_date)}</div>
            </div>
          </div>
          <div className={styles.Card__participants}>
            {issue.implementers.length > 0 &&
              issue.implementers.map((el, index) => (
                <Avatar key={index} avatarUrl={el.user.avatar_url} width={24}></Avatar>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
