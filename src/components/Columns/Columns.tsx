import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = data.find((elem) => elem.id === source.droppableId);
      const destColumn = data.find((elem) => elem.id === destination.droppableId);
      const sourceItems = [...sourceColumn!.tasks];
      const destItems = [...destColumn!.tasks];
      const removed = sourceItems[source.index];
      const resultSourceItems = sourceItems.filter((el) => el.id !== removed.id);
      destItems.splice(destination.index, 0, removed); 

      const newData = data.map((column) => {
        if (column.id === source.droppableId) {
          return ({
            ...sourceColumn,
            tasks: resultSourceItems
          } as Column)
        }
        if (column.id === destination.droppableId) {
          return ({
            ...destColumn,
            tasks: destItems
          } as Column)
        }
        return column;
      })
      setData(newData);

    } else {
      const destColumn = data.find((elem) => elem.id === source.droppableId);
      const destItems = [...destColumn!.tasks];
      const [removed] = destItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const result = data.map((el) => {
        if (el.id === destination.droppableId) {
          return ({
            ...el,
            tasks: destItems
          })
        }
        return el;
      });

      setData(result);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.ColumnsWrapper}>
        {data.map((column : Column, index: number) => (
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
                  
                </Column>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
