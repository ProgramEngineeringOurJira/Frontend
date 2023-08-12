import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Icon } from '../Icon';

export interface CartProps {
    className?: string;
    description?: string;
    header: string;
}

export const Cart: FC<CartProps> = ({ className, description, header }) => {

    return (
        <div className={clsx(styles.Cart, className)}>
            <div className={styles.Cart_conteiner}>
                <h3 className={styles.Cart_header}>{header}</h3>
                <p className={styles.Cart_description}>{description}</p>
                <div className={styles.Cart_line}></div>
                <div className={styles.Cart_bottom}>
                    <div className={styles.Cart_bottom_icons}>
                        <Icon className={styles.Cart_priority} iconName={'flag_red'} />
                        <div className={styles.Cart_time_wrapper}>
                            <Icon className={styles.Cart_time_clock_icon} iconName={'clock'} />
                            <div className={styles.Cart_time_date}>Mar 4</div>
                        </div>
                    </div>
                    <div className={styles.Cart_participants}></div>
                </div>
            </div>
        </div>
    )
}