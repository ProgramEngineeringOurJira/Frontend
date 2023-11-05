import { RouteObject } from 'react-router-dom';

import { BoardPage, CreateProject, Login, NotFoundPage, Ticket } from '../pages';

import { paths } from './paths';
import { RegisterLogin } from '../pages/Login/RegisterLogin';

export const Router: RouteObject[] = [
  {
    path: paths.board,
    element: <BoardPage />
  },
  {
    path: paths.login,
    element: <Login />
  },
  {
    path: `${paths.sprint}/:id`,
    element: <BoardPage />
  },
  {
    path: paths.createProject,
    element: <CreateProject />
  },
  {
    path: `${paths.ticket}/:id`,
    element: <Ticket />
  },
  {
    path: paths.register,
    element: <RegisterLogin />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
