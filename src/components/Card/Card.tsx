import { FC } from 'react';
import clsx from 'clsx';

import { Icon } from '../../ui-kit/Icon';
import { PriorityTypes } from '../../utils/constants';
import { Label } from '../../ui-kit/Label/Label';

import styles from './styles.module.scss';

type CardProps = {
  className?: string;
  description?: string;
  header: string;
  date: string;
  priority: string;
  label: string;
};

export const Card: FC<CardProps> = ({ className, description, header, date, priority, label }) => {

  function getIconName(priority: string) {
    if (priority === PriorityTypes.HIGHT) return 'flag_red';
    if (priority === PriorityTypes.MEDIUM) return 'flag_yellow';
    return 'flag_green';
  }

  return (
    <div className={clsx(styles.Card, className)}>
      <h3 className={styles.Card__header}>{header}</h3>
      <p className={styles.Card__description}>{description}</p>
      <Label text={label} />
      <div className={styles.Card__line}></div>
      <div className={styles.Card__bottom}>
        <div className={styles['Card__bottom-icons']}>
          <Icon iconName={getIconName(priority)} />
          {
            //<div className={styles.Card_time_wrapper}>
            //<Icon className={styles.Card_time_clock_icon} iconName={'clock'} />
            //<div className={styles.Card_time_date}>{getDate(date)}</div>
            //</div>
          }
        </div>
        <div className={styles.Card__participants}></div>
      </div>
    </div>
  );
};
