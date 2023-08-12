import React from 'react';

import './reset.css'
import './App.css'
import './global-styles/index.scss';
import { Column } from './ui-kit/Column';
import { Cart } from './ui-kit/Cart/Cart';
import { useSelector } from 'react-redux'
import { Button } from './ui-kit/Button';

type Task = {
  title: string;
  description: string;
  status: boolean;
}

type Column = {
  name: string;
  tasks: Task[];
}

type Columns = {
  columns: Column[];
}

function App() {
  const columns = useSelector((state: Columns) => state.columns);

  return (
    <>

      


      <div className='Wrapper'>
        {columns.map((column, index) => <Column key={index} text={column.name}>
          {column.tasks.map((task, index) => (<Cart key={index} header={task.title} description={task.description}></Cart>))}
        </Column>)}
      </div>
    </>
  )
}

export default App
