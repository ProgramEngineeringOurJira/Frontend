import { FC } from 'react';
import issueJSON from '../../data/issue.json';

import { Header } from '../../components/Header';
import { PageLayout } from '../../components/PageLayout';
import { IssueInfo } from '../../components/IssueInfo';
import { Comment } from '../../components/Comment';
import { Button } from '../../ui-kit/Button';

import './styles.scss';

type Issue = {
  name: string;
  text: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGRENT';
  state: 'Backlog' | 'To do' | 'In Progress' | 'In Review' | 'QA' | 'Done';
  id: string;
  creation_date: string;
  end_date: string;
  label: 'frontend' | 'backend' | 'devops' | 'qa' | 'design' | 'other';
  author?: {
    id: string;
    user: {
      email: string;
      id: string;
    };
    role: 'ADMIN' | 'MEMBER' | 'GUEST';
  };
  implementers: UserAssignedWorkplace[];
  comments: Comment[];
  subissues: Issue[];
};

type Comment = {
  text: string;
  files: string[];
  id: string;
  creation_date: string;
  author?: UserAssignedWorkplace;
};

type UserAssignedWorkplace = {
  id: string;
  user: {
    email: string;
    id: string;
  };
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
};

export const Ticket: FC = () => {
  const issue: Issue = {
    name: 'Андрею провести код ревью',
    text: 'Lorem ipsum dolor sit amet consectetur. Ut commodo morbi in mattis amet. Enim purus enim sed ac justo scelerisque in ornare. Eget turpis egestas nunc risus volutpat elementum id. Blandit placerat id mauris consequat nibh ut potenti. Elementum amet sed molestie massa tempus. Ac eu vel quam molestie nec cras amet. Nisl aliquet aliquet id etiam posuere nisl lectus donec faucibus. Sed maecenas tellus vulputate urna gravida porta mi. Mauris pharetra tellus sed bibendum sed nisi sed pharetra. Pharetra vitae tellus tristique posuere vel amet bibendum cursus. Leo interdum elementum non id elementum platea. Turpis eget dignissim sollicitudin pellentesque dictum eleifend morbi sed. Sit lacus ornare volutpat dictum morbi massa. Ultrices egestas lorem dolor donec nunc malesuada lacus senectus elit. Ac euismod mi elementum enim nisi sem ut penatibus. Id molestie feugiat malesuada aliquam purus nec convallis. Nec justo urna a consectetur euismod fermentum sagittis. At suscipit amet augue interdum. Iaculis suspendisse lacinia risus justo eu viverra eget ut. Ac malesuada cras neque vestibulum. Ullamcorper id arcu risus maecenas aliquet mollis sed lectus. Egestas netus sed elit ut sit. Lobortis magnis posuere nibh rhoncus purus. In massa morbi porttitor est. Mi id tincidunt duis duis donec risus. Mauris ultricies sed vulputate nibh ipsum faucibus ipsum sit mauris. Proin nisi duis faucibus dolor in. Sit ornare ac nisi amet nunc fringilla interdum massa ipsum. Lorem vitae donec tortor placerat amet risus.',
    priority: 'HIGH',
    state: 'To do',
    id: '353d3b50-bfb4-4b8e-b75a-97186e823f26',
    creation_date: '2023-11-12T09:53:46.944000',
    end_date: '2023-11-12T09:53:46.944000',
    label: 'backend',
    author: undefined,
    implementers: [
      {
        id: 'b8112501-6429-4c81-b755-562a17b4266c',
        user: {
          email: 'andreyka24072002@bk.ru',
          id: 'ac1fc4f4-dcbe-46d7-beba-3c2f5460802f'
        },
        role: 'ADMIN'
      }
    ],
    comments: [
      {
        text: 'Стоит убрать меня из этого проекта',
        files: [],
        id: '1',
        creation_date: '2023-11-09T09:58:28.373000',
        author: {
          id: 'b8112501-6429-4c81-b755-562a17b4266c',
          user: {
            email: 'andrey24072002@bk.ru',
            id: 'ac1fc4f4-dcbe-46d7-beba-3c2f5460802f'
          },
          role: 'ADMIN'
        }
      },
      {
        text: 'Согласен',
        files: [],
        id: '2',
        creation_date: '2023-11-11T17:38:28.373000'
      },
      {
        text: 'А где файлы?',
        files: [],
        id: '3',
        creation_date: '2023-11-12T17:38:28.373000'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur. Ut commodo morbi in mattis amet. Enim purus enim sed ac justo scelerisque in ornare. Eget turpis egestas nunc risus volutpat elementum id. Blandit placerat id mauris consequat nibh ut potenti. Elementum amet sed molestie massa tempus. Ac eu vel quam molestie nec cras amet. Nisl aliquet aliquet id etiam posuere nisl lectus donec faucibus. Sed maecenas tellus vulputate urna gravida porta mi. Mauris pharetra tellus sed bibendum sed nisi sed pharetra. Pharetra vitae tellus tristique posuere vel amet bibendum cursus. Leo interdum elementum non id elementum platea. Turpis eget dignissim sollicitudin pellentesque dictum eleifend morbi sed. Sit lacus ornare volutpat dictum morbi massa. Ultrices egestas lorem dolor donec nunc malesuada lacus senectus elit. Ac euismod mi elementum enim nisi sem ut penatibus. Id molestie feugiat malesuada aliquam purus nec convallis. Nec justo urna a consectetur euismod fermentum sagittis. At suscipit amet augue interdum. Iaculis suspendisse lacinia risus justo eu viverra eget ut. Ac malesuada cras neque vestibulum. Ullamcorper id arcu risus maecenas aliquet mollis sed lectus. Egestas netus sed elit ut sit. Lobortis magnis posuere nibh rhoncus purus. In massa morbi porttitor est. Mi id tincidunt duis duis donec risus. Mauris ultricies sed vulputate nibh ipsum faucibus ipsum sit mauris. Proin nisi duis faucibus dolor in. Sit ornare ac nisi amet nunc fringilla interdum massa ipsum. Lorem vitae donec tortor placerat amet risus.',
        files: [],
        id: '4',
        creation_date: '2023-11-09T09:58:28.373000',
        author: {
          id: 'b8112501-6429-4c81-b755-562a17b4266c',
          user: {
            email: 'andrey24072002@bk.ru',
            id: 'ac1fc4f4-dcbe-46d7-beba-3c2f5460802f'
          },
          role: 'ADMIN'
        }
      },
      {
        text: 'Вопросы?',
        files: [],
        id: '5',
        creation_date: '2023-11-12T17:38:28.373000'
      },
      {
        text: 'Вопросы?',
        files: [],
        id: '6',
        creation_date: '2023-11-12T17:38:28.373000'
      },
      {
        text: 'Вопросы?',
        files: [],
        id: '7',
        creation_date: '2023-11-12T17:38:28.373000'
      }
    ],
    subissues: [
      {
        id: 'fa130e3',
        name: 'Отрисовать дизайн за 10 копеек',
        text: 'СРОЧНО СДЕЛАТЬ',
        priority: 'URGRENT',
        state: 'To do',
        creation_date: '2023-11-11T09:53:46.944000',
        end_date: '2023-11-12T09:53:46.944000',
        label: 'backend',
        author: {
          id: 'b8112501-6429-4c81-b755-562a17b4266c',
          user: {
            email: 'andreyka24072002@bk.ru',
            id: 'ac1fc4f4-dcbe-46d7-beba-3c2f5460802f'
          },
          role: 'ADMIN'
        },
        implementers: [],
        comments: [],
        subissues: []
      },
      {
        id: 'fa130e3',
        name: 'Отрисовать дизайн за 10 копеек и не умереть с голоду, попытка номер 2',
        text: 'СРОЧНО СДЕЛАТЬ',
        priority: 'URGRENT',
        state: 'In Review',
        creation_date: '2023-11-11T09:53:46.944000',
        end_date: '2023-11-12T09:53:46.944000',
        label: 'backend',
        author: {
          id: 'b8112501-6429-4c81-b755-562a17b4266c',
          user: {
            email: 'andreyka24072002@bk.ru',
            id: 'ac1fc4f4-dcbe-46d7-beba-3c2f5460802f'
          },
          role: 'ADMIN'
        },
        implementers: [],
        comments: [],
        subissues: []
      },
      {
        id: 'fa130e3',
        name: 'Отрисовать дизайн за 10 копеек и не умереть с голоду, попытка номер 3',
        text: 'СРОЧНО СДЕЛАТЬ',
        priority: 'URGRENT',
        state: 'Done',
        creation_date: '2023-11-11T09:53:46.944000',
        end_date: '2023-11-12T09:53:46.944000',
        label: 'backend',
        author: {
          id: 'b8112501-6429-4c81-b755-562a17b4266c',
          user: {
            email: 'andreyka24072002@bk.ru',
            id: 'ac1fc4f4-dcbe-46d7-beba-3c2f5460802f'
          },
          role: 'ADMIN'
        },
        implementers: [],
        comments: [],
        subissues: []
      }
    ]
  };
  // const issueObject: Issue = JSON.parse(issueJSON);

  return (
    <div className="ticket">
      <Header />
      <PageLayout>
        <div className="top">
          <div>
            <span className="top__projectName">Project name</span>
          </div>
          <div className="top__controls">
            <Button text="Edit" type="primary" />
            <Button text="Comment" type="primary" />
          </div>
        </div>
        <IssueInfo {...issue} />
        <div className="comments">
          <div className="comments__header">
            <span>Comments</span>
          </div>
          <div className="comments__content">
            {issue.comments.map((comment: Comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};
