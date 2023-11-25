import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import { Column } from '../Column';
import { Card } from '../Card';

import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { Sprint, ColumnType } from '../../utils/types';
import { RootState } from '../../redux/store';
import { currSprintActions } from '../../redux/features/currentSprintSlice';

type BoardIdProps = {
  boardId: string | undefined;
};

export const Columns: FC<BoardIdProps> = (boardId) => {
  const { sprintId } = useParams();
  const columns = useSelector((state: RootState) => state.columns);
  const [data, setData] = useState<ColumnType[]>([]);
  const dispatch = useDispatch();

  const currentSprint = useSelector((state: RootState) => state.currSprint.value);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = currentSprint.columns.find((elem: ColumnType) => elem.name === source.droppableId);
      const destColumn = currentSprint.columns.find((elem: ColumnType) => elem.name === destination.droppableId);
      const sourceItems = [...sourceColumn!.issues];
      const destItems = [...destColumn!.issues];
      const removed = sourceItems[source.index];
      const resultSourceItems = sourceItems.filter((el) => el.id !== removed.id);
      destItems.splice(destination.index, 0, removed);

      const newData = currentSprint.columns.map((column) => {
        if (column.name === source.droppableId) {
          return ({
            ...sourceColumn,
            tasks: resultSourceItems
          } as ColumnType)
        }
        if (column.name === destination.droppableId) {
          return ({
            ...destColumn,
            tasks: destItems
          } as ColumnType)
        }
        return column;
      })
      dispatch(currSprintActions.setSprint(newData));
    } else {
      const destColumn = currentSprint.columns.find((elem) => elem.name === source.droppableId);
      const destItems = [...destColumn!.issues];
      const [removed] = destItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const result = currentSprint.columns.map((el) => {
        if (el.name === destination.droppableId) {
          return ({
            ...el,
            tasks: destItems
          })
        }
        return el;
      });
      dispatch(currSprintActions.setSprint(result));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.ColumnsWrapper}>
        {currentSprint.columns.length ?

          currentSprint.columns.map((column: ColumnType, index: number) => (
            <Droppable key={column.name} droppableId={column.name}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column key={index} text={column.name} quantity_tasks={column.issues.length}>
                    {column.issues.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}

                          >
                            <Card
                              key={index}
                              header={task.name}
                              description={task.text}
                              date={task.end_date}
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
          ))
          : <div>Нет задач</div>}
      </div>
    </DragDropContext>
  );
};
