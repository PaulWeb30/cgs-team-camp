import React from 'react';
import { IGetTodos } from '../../../types/todo.types';
import { TodoActions } from '../todo-actions/todo-actions.component';
import { TodoPagination } from '../todo-pagination';
import {
  StyledTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow
} from './todo-table.styled';

type ITodosTableProps = {
  data: IGetTodos | undefined;
};

export const TodosTable = ({ data }: ITodosTableProps) => (
  <div>
    {data?.todos?.length ? (
      <>
        <TableContainer>
          <StyledTable>
            <TableHeader>
              <TableRow>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.todos?.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell>
                    <TodoActions todo={todo} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
        <TodoPagination count={data?.totalPages} page={data?.page} />
      </>
    ) : (
      <h2>No todos found</h2>
    )}
  </div>
);
