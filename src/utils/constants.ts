export const PRIORITY_TYPES = new Map().set('red', 'hight').set('medium', 'yellow').set('low', 'green');

export enum PriorityTypess {
  HIGHT = 'red',
  MEDIUM = 'yellow',
  LOW = 'green'
}

export const LabelColors = new Map()
  .set('frontend', 'pink')
  .set('backend', 'blue')
  .set('devops', 'green')
  .set('qa', 'yellow')
  .set('design', 'purple')
  .set('other', 'gray');

export const LC_USER = 'user';
export const LC_ACCESS_TOKEN = 'accessToken';
export const LC_REFRESH_TOKEN = 'refreshToken';
export const LC_EXP_TIME = 'exp';

export const ERROR_401 = 'Request failed with status code 401';

export const MESSAGE_401 = 'Access Denied! Invalid Credentials';


// удалить
export enum Priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGRENT = 'URGRENT'
}

// удалить!!!!!!
export enum LabelTypes {
  frontend = 'frontend',
  backend = 'backend',
  devops = 'devops',
  qa = 'qa',
  design = 'design',
  other = 'other'
}

// удалить!!!! они же одинаковые
export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
}

type VES = 'HIGH' | 'NORMAL' | 'LOW' | 'URGRENT';
type VES_API = 'HIGH' | 'NORMAL' | 'LOW' | 'URGRENT';

export enum State {
  Backlog = 'Backlog',
  ToDo = 'To do',
  InProgress = 'In Progress',
  InReview = 'In Review',
  QA = 'QA',
  Done = 'Done'
}

export const priorityTypes: Record<VES, VES_API> = {
  URGRENT: 'URGRENT',
  HIGH: 'HIGH',
  NORMAL: 'NORMAL',
  LOW: 'LOW',
};

type StateLabels = 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'INREVIEW' | 'QA' | 'DONE';
type StateText = 'Backlog' | 'To do' | 'In Progress' | 'In Review' | 'QA' | 'Done';

export const stateTypes: Record<StateLabels, StateText> = {
  BACKLOG: 'Backlog',
  TODO: 'To do',
  INPROGRESS: 'In Progress',
  INREVIEW: 'In Review',
  QA: 'QA',
  DONE: 'Done'
};

type LabelsText = 'Frontend' | 'Backend' | 'Devops' | 'QA' | 'Design' | 'Other';
type Labels = 'frontend' | 'backend' | 'devops' | 'qa' | 'design' | 'other';

export const labelTypes: Record<Labels, LabelsText> = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'Devops',
  qa: 'QA',
  design: 'Design',
  other: 'Other'
};
