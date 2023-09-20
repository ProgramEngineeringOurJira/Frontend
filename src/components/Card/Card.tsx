import { FC } from 'react';
import clsx from 'clsx';

import { Icon } from '../../ui-kit/Icon';
import { PriorityTypes } from '../../utils/constants';

import styles from './styles.module.scss';

type CardProps = {
  className?: string;
  description?: string;
  header: string;
  date: Date;
  priority: string;
};

export const Card: FC<CardProps> = ({ className, description, header, date, priority }) => {
  function getDate(date: Date) {
    const taskDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric'
    };
    return taskDate.toLocaleDateString('en-US', options);
  }

  function getIconName(priority: string) {
    if (priority === PriorityTypes.HIGHT) return 'flag_red';
    if (priority === PriorityTypes.MEDIUM) return 'flag_yellow';
    return 'flag_green';
  }

  return (
    <div className={clsx(styles.Card, className)}>
      <div className={styles.Card_conteiner}>
        <h3 className={styles.Card_header}>{header}</h3>
        <p className={styles.Card_description}>{description}</p>
        <div className={styles.Card_line}></div>
        <div className={styles.Card_bottom}>
          <div className={styles.Card_bottom_icons}>
            <Icon className={styles.Card_priority} iconName={getIconName(priority)} />
            <div className={styles.Card_time_wrapper}>
              <Icon className={styles.Card_time_clock_icon} iconName={'clock'} />
              <div className={styles.Card_time_date}>{getDate(date)}</div>
            </div>
          </div>
          <div className={styles.Card_participants}></div>
        </div>
      </div>
    </div>
  );
};
