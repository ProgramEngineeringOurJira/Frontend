import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import { ColumnType } from '../../utils/types';
import { RootState } from '../../redux/store';
import { currSprintActions } from '../../redux/features/currentSprintSlice';
import { Column } from '../Column';
import { Card } from '../Card';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

export const Columns = () => {
  const dispatch = useDispatch();
  const currentSprint = useSelector((state: RootState) => state.currSprint.value);
  const [currentSprintState, setCurrentSprintState] = useState(currentSprint);

  useEffect(() => {
    setCurrentSprintState(currentSprint);
    console.log('qqqqqqq');
    //location.reload();
    console.log(currentSprintState);
  }, [currentSprint.columns]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = currentSprintState.columns.find((elem: ColumnType) => elem.name === source.droppableId);
      const destColumn = currentSprintState.columns.find((elem: ColumnType) => elem.name === destination.droppableId);
      const sourceItems = [...sourceColumn!.issues];
      const destItems = [...destColumn!.issues];
      const removed = sourceItems[source.index];
      const resultSourceItems = sourceItems.filter((el) => el.id !== removed.id);
      destItems.splice(destination.index, 0, removed);

      const newData = currentSprintState.columns.map((column) => {
        if (column.name === source.droppableId) {
          return ({
            ...sourceColumn,
            issues: resultSourceItems
          } as ColumnType)
        }
        if (column.name === destination.droppableId) {
          return ({
            ...destColumn,
            issues: destItems
          } as ColumnType)
        }
        return column;
      })

      dispatch(currSprintActions.setSprint({ ...currentSprintState, columns: newData }));
    } else {
      const destColumn = currentSprintState.columns.find((elem) => elem.name === source.droppableId);
      const destItems = [...destColumn!.issues];
      const [removed] = destItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const result = currentSprintState.columns.map((el) => {
        if (el.name === destination.droppableId) {
          return ({
            ...el,
            issues: destItems
          })
        }
        return el;
      });
      dispatch(currSprintActions.setSprint({ ...currentSprintState, columns: result }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.ColumnsWrapper}>
        {currentSprintState.columns?.length ?

          currentSprintState.columns.map((column: ColumnType, index: number) => (
            <Droppable key={column.name} droppableId={column.name}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column key={index} text={column.name} quantity_tasks={column.issues.length}>
                    {column.issues.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
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
