import React, { FC } from "react";
import { Column } from "../Column/Column";
import styles from './styles.module.scss'
import { Card } from "../Card/Card";
import { useSelector } from "react-redux";

type Task = {
    title: string;
    description: string;
    status: boolean;
    date: Date;
    priority: string;
}

type Column = {
    name: string;
    tasks: Task[];
}

type Columns = {
    columns: Column[];
}

export const Columns: FC = () => {
    const columns = useSelector((state: Columns) => state.columns);
    return (
        <div className={styles.ColumnsWrapper}>
            {columns.map((column, index) =>
                <Column key={index} text={column.name}>
                    {column.tasks.map((task, index) => (<Card key={index} header={task.title} description={task.description} date={task.date} priority={task.priority}></Card>))}
                </Column>
            )}
        </div>
    )
}
