import { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Icon } from '../../ui-kit/Icon';
import { PriorityTypess } from '../../utils/constants';
import { Label } from '../../ui-kit/Label/Label';

import styles from './styles.module.scss';
import { formatDate, formatDateForCard } from '../../utils/helpers';

type CardProps = {
  id: string;
  className?: string;
  description?: string;
  header: string;
  date: string;
  priority: string;
  label: string;
  documentsCount?: number;
};

export const Card: FC<CardProps> = ({
  id,
  className,
  description,
  header,
  date,
  priority,
  label,
  documentsCount = 0
}) => {
  function getIconName(priority: string) {
    if (priority === PriorityTypess.HIGHT) return 'flag_red';
    if (priority === PriorityTypess.MEDIUM) return 'flag_yellow';
    return 'flag_green';
  }

  return (
    <Link to={`/ticket/${id}`}>
      <div className={clsx(styles.Card, className)}>
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

            <Icon iconName={getIconName(priority)} />

            <div className={styles.Card_time_wrapper}>
              <Icon className={styles.Card_time_clock_icon} iconName={'clock'} />
              <div className={styles.Card_time_date}>{formatDateForCard(date)}</div>
            </div>

          </div>
          <div className={styles.Card__participants}></div>
        </div>
      </div>
    </Link>
  );
};
