import { LabelTypes, Priority, Role, State } from './constants';

export type Issue = {
  name: string;
  text: string;
  priority: Priority;
  state: State;
  label: LabelTypes;
  end_date: string;
  id: string;
  creation_date: string;
  author: UserAssignedWorkplace;
  files: string[];
  implementers: UserAssignedWorkplace[];
  comments: Comment[];
  subissues: Issue[];
};

export type Workplace = {
  name: string;
  description?: string;
  id: string;
  sprints: Sprint[];
};

export type Sprint = {
  name: string;
  start_date: string;
  end_date: string;
  id: string;
  columns: ColumnType[];
};

export type ColumnType = {
  name: State;
  issues: Issue[];
};

export type Comment = {
  text: string;
  files: string[];
  id: string;
  creation_date: string;
  author: UserAssignedWorkplace;
};

export type UserAssignedWorkplace = {
  id: string;
  user: User;
  role: Role;
};

export type User = {
  email: string;
  name: string;
  id: string;
  avatar_url: string;
};
