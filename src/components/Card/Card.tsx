import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Icon } from '../../ui-kit/Icon';

type CartProps = {
    className?: string;
    description?: string;
    header: string;
    date: Date;
    priority: string
}

export const Card: FC<CartProps> = ({ className, description, header, date, priority }) => {

    function getDate(date: Date) {
        const taskDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric', month: 'numeric'
        }
        return taskDate.toLocaleDateString("en-US", options);
    }

    function getIconName(priority: string) {
        if (priority === 'red')
            return 'flag_red'
        if (priority === 'yellow')
            return 'flag_yellow'
        return 'flag_green'
    }

    return (
        <div className={clsx(styles.Cart, className)}>
            <div className={styles.Cart_conteiner}>
                <h3 className={styles.Cart_header}>{header}</h3>
                <p className={styles.Cart_description}>{description}</p>
                <div className={styles.Cart_line}></div>
                <div className={styles.Cart_bottom}>
                    <div className={styles.Cart_bottom_icons}>
                        <Icon className={styles.Cart_priority} iconName={getIconName(priority)} />
                        <div className={styles.Cart_time_wrapper}>
                            <Icon className={styles.Cart_time_clock_icon} iconName={'clock'} />
                            <div className={styles.Cart_time_date}>{getDate(date)}</div>
                        </div>
                    </div>
                    <div className={styles.Cart_participants}></div>
                </div>
            </div>
        </div>
    )
}