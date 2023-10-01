import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Column } from '../Column';
import { Card } from '../Card';

import styles from './styles.module.scss';

type Task = {
  title: string;
  description: string;
  status: boolean;
  date: Date;
  priority: string;
};

type Column = {
  name: string;
  tasks: Task[];
};

type Columns = {
  columns: Column[];
};

export const Columns: FC = () => {
  const columns = useSelector((state: Columns) => state.columns);

  return (
    <div className={styles.ColumnsWrapper}>
      {columns.map((column, index) => (
        <Column key={index} text={column.name}>
          {column.tasks.map((task, index) => (
            <Card
              key={index}
              header={task.title}
              description={task.description}
              date={task.date}
              priority={task.priority}
            />
          ))}
        </Column>
      ))}
    </div>
  );
};
