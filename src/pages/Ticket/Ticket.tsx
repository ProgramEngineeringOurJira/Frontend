import { FC } from 'react';

import { Header } from '../../components/Header';
import { PageLayout } from '../../components/PageLayout';
import { Button } from '../../ui-kit/Button';

import './styles.scss';

export const Ticket: FC = () => {
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
        <div className="ticket-information">
          <div className="ticket-information__blocks">
            <div className="ticket-header">
              <img src="https://fikiwiki.com/uploads/posts/2022-02/1644827473_48-fikiwiki-com-p-kartinki-smeshnie-krasivie-i-milie-pro-kot-53.jpg" alt="Responsible for the ticket" height="56" width="56" /*className="ticket-header__photo"*/ />
              <div className="ticket-header__info">
                <span className="ticket-title">Ticket title</span>
                <span className="ticket-existenceTime">Added by Nikita Baranov 12 days ago. Updated 4 days ago.</span>
              </div>
            </div>
            <div className="ticket-mainInfo">
              <div className="info-block">
                <div className="flex-column keys bold-title">
                  <span>State:</span>
                  <span>Priority:</span>
                  <span>Assignees:</span>
                </div>
                <div className="flex-column">
                  <span>In progress</span>
                  <span>Low</span>
                  <span>Baranov Nikita</span>
                </div>
              </div>
              <div className="info-block">
                <div className="flex-column keys bold-title">
                  <span className="info-key">Task type:</span>
                  <span className="info-key">Start date:</span>
                  <span className="info-key">Due date:</span>
                </div>
                <div className="flex-column">
                  <span>Task type</span>
                  <span>15.09.2023</span>
                  <span>17.10.2023</span>
                </div>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="flex-column">
              <span className="bold-title">Description</span>
              <span>Lorem ipsum dolor sit amet consectetur. Ut commodo morbi in mattis amet. Enim purus enim sed ac justo scelerisque in ornare. Eget turpis egestas nunc risus volutpat elementum id. Blandit placerat id mauris consequat nibh ut potenti. Elementum amet sed molestie massa tempus. Ac eu vel quam molestie nec cras amet. Nisl aliquet aliquet id etiam posuere nisl lectus donec faucibus. Sed maecenas tellus vulputate urna gravida porta mi. Mauris pharetra tellus sed bibendum sed nisi sed pharetra. Pharetra vitae tellus tristique posuere vel amet bibendum cursus. Leo interdum elementum non id elementum platea. Turpis eget dignissim sollicitudin pellentesque dictum eleifend morbi sed. Sit lacus ornare volutpat dictum morbi massa. Ultrices egestas lorem dolor donec nunc malesuada lacus senectus elit. Ac euismod mi elementum enim nisi sem ut penatibus. Id molestie feugiat malesuada aliquam purus nec convallis. Nec justo urna a consectetur euismod fermentum sagittis. At suscipit amet augue interdum. Iaculis suspendisse lacinia risus justo eu viverra eget ut. Ac malesuada cras neque vestibulum. Ullamcorper id arcu risus maecenas aliquet mollis sed lectus. Egestas netus sed elit ut sit. Lobortis magnis posuere nibh rhoncus purus. In massa morbi porttitor est. Mi id tincidunt duis duis donec risus. Mauris ultricies sed vulputate nibh ipsum faucibus ipsum sit mauris. Proin nisi duis faucibus dolor in. Sit ornare ac nisi amet nunc fringilla interdum massa ipsum. Lorem vitae donec tortor placerat amet risus.</span>
            </div>
            <div className="horizontal-line"></div>
            <div className="flex-column">
              <span className="bold-title">Subtasks</span>
              <div className="subtask">
                <span className="subtask__title"><span className="blue-text bold-title">Ticket e1eef73: </span>Отрисовать дизайн за 10 копеек</span>
                <div className="subtask__info">
                  <span className="subtask__info-element">New</span>
                  <span className="subtask__info-element">15.09.2023</span>
                  <span className="subtask__info-element">30.09.2023</span>
                  <span className="subtask__info-element">Baranov Nikita</span>
                </div>
              </div>
              <div className="subtask">
                <span className="subtask__title"><span className="blue-text bold-title">Ticket 0ed4026: </span>Отрисовать дизайн за 10 копеек</span>
                <div className="subtask__info">
                  <span className="subtask__info-element">In progress</span>
                  <span className="subtask__info-element">15.09.2023</span>
                  <span className="subtask__info-element">30.09.2023</span>
                  <span className="subtask__info-element">Baranov Nikita</span>
                </div>
              </div>
              <div className="subtask">
                <span className="subtask__title"><span className="blue-text bold-title">Ticket d5ec6dd: </span>Отрисовать дизайн за 10 копеек и не умереть с голоду, попытка номер 3</span>
                <div className="subtask__info">
                  <span className="subtask__info-element">Improvement</span>
                  <span className="subtask__info-element">15.09.2023</span>
                  <span className="subtask__info-element">30.09.2023</span>
                  <span className="subtask__info-element">Baranov Nikita</span>
                </div>
              </div>
              <div className="subtask">
                <span className="subtask__title"><span className="blue-text bold-title">Ticket fa130e3: </span>Отрисовать дизайн за 10 копеек</span>
                <div className="subtask__info">
                  <span className="subtask__info-element">Solved</span>
                  <span className="subtask__info-element">15.09.2023</span>
                  <span className="subtask__info-element">30.09.2023</span>
                  <span className="subtask__info-element">Baranov Nikita</span>
                </div>
              </div>
            </div>
            <div className="flex-column">
              <div className="subtask">
                <span className="subtask__title"><span className="blue-text bold-title">Ticket 6f87d88: </span>Отрисовать дизайн за 10 копеек</span>
                <div className="subtask__info">
                  <span className="subtask__info-element">Closed</span>
                  <span className="subtask__info-element">15.09.2023</span>
                  <span className="subtask__info-element">30.09.2023</span>
                  <span className="subtask__info-element">Baranov Nikita</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};
