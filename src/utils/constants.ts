export const PRIORITY_TYPES = new Map().set('red', 'hight').set('medium', 'yellow').set('low', 'green');

export enum PriorityTypes {
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
