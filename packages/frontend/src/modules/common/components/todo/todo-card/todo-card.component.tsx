import React from 'react';
import { useLocation } from 'react-router-dom';
import { APP_KEYS } from '../../../consts';
import { ITodo } from '../../../types/todo.types';
import { TodoActions } from '../todo-actions/todo-actions.component';

import { Card, Content, Title } from './todo-card.styled';

type ITodoCardProps = {
  todo: ITodo;
};

export const TodoCard = ({ todo }: ITodoCardProps) => {
  const location = useLocation();
  const isMainPage = location.pathname === APP_KEYS.ROUTER_KEYS.ROOT;
  return (
    <Card>
      <Title>{todo?.title}</Title>
      <Content>{todo?.description}</Content>
      {isMainPage && <TodoActions todo={todo} />}
    </Card>
  );
};
