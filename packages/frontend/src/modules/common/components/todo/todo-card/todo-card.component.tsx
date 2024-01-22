import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../../../consts';
import { ITodo } from '../../../types/todo.types';
import { TodoActions } from '../todo-actions/todo-actions.component';

import { Button, Card, Content, Title } from './todo-card.styled';

type ITodoCardProps = {
  todo: ITodo;
};

export const TodoCard = ({ todo }: ITodoCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === APP_KEYS.ROUTER_KEYS.ROOT;
  return (
    <Card>
      <Title>{todo?.title}</Title>
      <Content>{todo?.description}</Content>
      {isMainPage && <TodoActions todo={todo} />}
      {!isMainPage && (
        <Button type="button" onClick={() => navigate(-1)}>
          Go back
        </Button>
      )}
    </Card>
  );
};
