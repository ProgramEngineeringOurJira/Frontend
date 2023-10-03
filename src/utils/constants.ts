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
