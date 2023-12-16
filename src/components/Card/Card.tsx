import { FC, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { usePutRequest } from '../../hooks/usePutRequest';
import { Icon } from '../../ui-kit/Icon';
import { priorityTypes, State } from '../../utils/constants';
import { Label } from '../../ui-kit/Label/Label';
import { formatDateForCard } from '../../utils/helpers';
import { UserAssignedWorkplace } from '../../utils/types';
import { paths } from '../../utils/paths';

import styles from './styles.module.scss';

type CardProps = {
  id: string;
  className?: string;
  description?: string;
  header: string;
  date: string;
  priority: string;
  label: string;
  state: State;
  draggedIssue: { id: string | null; state: State | null };
  onSetDraggedIssueCallback: (value: { id: string | null; state: State | null }) => void;
  documentsCount?: number;
  implementers: UserAssignedWorkplace[];
  isVisible: boolean;
};

export const Card: FC<CardProps> = ({
  id,
  className,
  description,
  header,
  date,
  priority,
  label,
  state,
  draggedIssue,
  onSetDraggedIssueCallback,
  isVisible,
  documentsCount = 0,
  implementers
}) => {
  const { idBoard, idSprint } = useParams();

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
    if (draggedIssue.id == id && draggedIssue.state != null && draggedIssue.state != state) {
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
    <Link to={`${paths.board}/${idBoard}${paths.sprint}/${idSprint}${paths.ticket}/${id}`}>
      <div className={clsx(styles.Card, className, !isVisible ? styles.hide : '')}>
        <h3 className={styles.Card__header}>{header}</h3>
        <p className={styles.Card__description}>{description}</p>
        <Label text={label} />
        <div className={styles.Card__line} />
        <div className={styles.Card__bottom}>
          <div className={styles['Card__bottom-icons']}>
            <div className={styles.Card__bottom_documentsWrapper}>
              <Icon iconName="paper_clip" color={documentsCount > 0 ? '#1D2D35' : '#C4C4C4'} />
              {documentsCount > 0 && <span className={styles.Card__bottom_documentsCount}>{documentsCount}</span>}
            </div>

            <Icon iconName="flag" color={getIconName(priority)} />

            <div className={styles.Card_time_wrapper}>
              <Icon className={styles.Card_time_clock_icon} iconName="clock" />
              <div className={styles.Card_time_date}>{formatDateForCard(date)}</div>
            </div>
          </div>
          <div className={styles.Card__participants}>
            {!!implementers.length &&
              implementers.map((el, index) => (
                <img
                  key={index}
                  //  TODO дождаться пока будет реализовано на бэке. Всьавить путь к картинке
                  //src={el.user.}
                  alt="User's avatar"
                  height="24"
                  width="24"
                  className={styles['Card__participants-avatar']}
                />
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
