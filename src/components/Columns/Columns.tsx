import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

type Sprint = {
  id: string;
  collection: string;
};

type Issue = {
  id: string;
  collection: string;
};

type Board = {
  _id: string;
  name: string;
  description: string;
  states: string[];
  sprints: Sprint[];
  tasks: Issue[];
};

type BoardIdProps = {
  boardId: string | undefined;
};

export const Columns: FC<BoardIdProps> = (boardId) => {
  const columns = useSelector((state: Columns) => state.columns);
  const [data, setData] = useState<Column[]>([]);
  const dispatch = useDispatch();
  const boards = useSelector((state: any) => state.board.value);
  const sprints = useSelector((state: any) => state.sprint.value);

  useEffect(() => {
    setData(columns)
  }, [columns])

  const onDragEnd = ({ source, destination }: any) => {
    console.log(source, destination)
    if (!destination) return;
    const sourceColIndex = data.findIndex((col) => col.id === source.droppableId);
    const destColIndex = data.findIndex((col) => col.id === destination.droppableId);
    const sourceCol = data[sourceColIndex];
    const destCol = data[destColIndex];

    const sourceColumnId = sourceCol.id;
    const destColumnId = destCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destColIndex].tasks = destTasks;
    } else {
      const [removed] = destTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      data[destColIndex].tasks = destTasks;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.ColumnsWrapper}>
        {columns.map((column : Column, index: number) => (
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
