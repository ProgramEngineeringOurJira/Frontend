import React, { FC, PropsWithChildren, useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { Button } from '../Button';
import { useDispatch } from 'react-redux';
import columnsSlice from '../../redux/features/columns/columnsSlice';

export interface ColumnProps {
    className?: string;
    text: string;
}

export const Column: FC<PropsWithChildren<ColumnProps>> = ({ className, text, children }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("Задача");
    const [description, setDescription] = useState("Описание");
    const [newColIndex, setNewColIndex] = useState(1);

    const onSubmit = (type: string) => {
        console.log('add');
        if (type === 'add') {
            dispatch(columnsSlice.actions.addTask({
                title,
                description,
                newColIndex
            }))
        }
    }
    return (
        <div className={clsx(styles.Column, className)}>
            <div className={styles.Column_conteiner}>
                <div className={styles.Column_header}>
                    <span className={styles.Column_header_text}>{text}</span>
                    <div className={styles['Column_header_quantity-wrapper']}>
                        <div className={styles.Column_header_quantity}>0</div>
                    </div>
                    <Button className={styles['Column_header_btn-add']} text='+' type='add' onClick={() => onSubmit('add')}></Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}