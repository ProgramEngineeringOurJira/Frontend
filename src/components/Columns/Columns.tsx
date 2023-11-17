import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Column } from '../Column';
import { Card } from '../Card';

import styles from './styles.module.scss';

type Task = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  date: Date;
  priority: string;
  label: string;
};

type Column = {
  id: string;
  name: string;
  tasks: Task[];
};

type Columns = {
  columns: Column[];
};

export const Columns: FC = () => {
  // TODO принимать значение boardId через пропс
  const boardId = 1;
  const columns = useSelector((state: Columns) => state.columns);
  const [history, setHistory] = useState<Column[]>([]);

  // TODO
  const onHistoryLoad = (data: any) => {
    setHistory(data.history);
  };

  const onDragEnd = ({ source, destination }: any) => {
    if (!destination) return;
    const sourceColIndex = columns.findIndex((col) => col.name === source.droppableId);
    const destColIndex = columns.findIndex((col) => col.name === destination.droppableId);
    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceColumnId = sourceCol.name;
    const destColumnId = destCol.name;

    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    if (source.droppableId === destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      columns[sourceColIndex].tasks = sourceTasks;
      columns[destColIndex].tasks = destTasks;
    } else {
      const [removed] = destTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, removed)
      columns[destColIndex].tasks = destTasks
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.ColumnsWrapper}>
        {columns.map((column, index) => (
          
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column key={index} text={column.name} quantity_tasks={column.tasks.length}>
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ cursor: snapshot.isDragging ? 'grab' : 'pointer' }}
                          >
                            <Card
                              key={index}
                              header={task.title}
                              description={task.description}
                              date={task.date}
                              priority={task.priority}
                              label={task.label}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Column>
                </div>
              )}
            </Droppable>
          
        ))}
      </div>
    </DragDropContext>
  );
};
