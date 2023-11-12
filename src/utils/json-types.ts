export type Issue = {
  name: string;
  text: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGRENT';
  state: string;
  id: string;
  creation_date: string;
  author?: UserAssignedWorkplace;
  implementers: UserAssignedWorkplace[];
  comments: Comment[];
};

export type Workplace = {
  name: string;
  description?: string;
  id: string;
  states: string[];
  sprints: Sprint[];
  issues: Issue[];
};

export type Sprint = {
  name: string;
  start_date: string;
  end_date: string;
  id: string;
  issues: Issue[];
};

export type Comment = {
  name: string;
  text: string;
  files: string[];
  id: string;
  creation_date: string;
  author?: UserAssignedWorkplace;
};

export type UserAssignedWorkplace = {
  id: string;
  user: {
    email: string;
    id: string;
  };
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
};
