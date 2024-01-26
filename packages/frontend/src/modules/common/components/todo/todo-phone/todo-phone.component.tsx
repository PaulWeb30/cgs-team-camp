import React from 'react';
import { ITodo } from '../../../types/todo.types';
import { TodoCard } from '../todo-card';

type ITodoPhoneProps = {
  todos: ITodo[] | undefined;
};

export const TodoPhone = ({ todos }: ITodoPhoneProps) => (
  <div>
    {todos?.length ? (
      todos?.map((todo) => <TodoCard key={todo.id} todo={todo} />)
    ) : (
      <h3>No todos found</h3>
    )}
  </div>
);
