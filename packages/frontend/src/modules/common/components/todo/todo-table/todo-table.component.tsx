import React from 'react';
import { ITodo } from '../../../types/todo.types';
import { TodoActions } from '../todo-actions/todo-actions.component';
import {
  StyledTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow
} from './todo-table.styled';

type ITodosTableProps = {
  todos: ITodo[] | undefined;
};

export const TodosTable = ({ todos }: ITodosTableProps) => (
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
        {todos?.map((todo) => (
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
);
