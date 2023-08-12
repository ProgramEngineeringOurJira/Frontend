import React, { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export const Wrapper: FC<PropsWithChildren<{ children: Element }>> = ({ children }) => {
    return (
        <div className={styles.Wrapper}>
            { children }
        </div>
    )
}