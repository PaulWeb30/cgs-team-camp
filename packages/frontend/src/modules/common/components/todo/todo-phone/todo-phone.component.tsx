import React from 'react';
import { IGetTodos } from '../../../types/todo.types';
import { TodoCard } from '../todo-card';
import { TodoPagination } from '../todo-pagination';

type ITodoPhoneProps = {
  data: IGetTodos | undefined;
};

export const TodoPhone = ({ data }: ITodoPhoneProps) => (
  <div>
    {data?.todos?.length ? (
      <>
        <div>
          {data?.todos?.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
        <TodoPagination count={data?.totalPages} page={data?.page} />
      </>
    ) : (
      <h3>No todos found</h3>
    )}
  </div>
);
