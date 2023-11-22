import { LabelTypes, Priority, Role, State } from './constants';

export type Issue = {
  name: string;
  text: string;
  priority: Priority;
  state: State;
  id: string;
  creation_date: string;
  end_date: string;
  label: LabelTypes;
  author: UserAssignedWorkplace;
  implementers: UserAssignedWorkplace[];
  comments: Comment[];
  subissues: Issue[];
};

export type Workplace = {
  name: string;
  description?: string;
  id: string;
  states: string[];
  sprints: Sprint[];
};

export type Sprint = {
  name: string;
  start_date: string;
  end_date: string;
  id: string;
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
};
