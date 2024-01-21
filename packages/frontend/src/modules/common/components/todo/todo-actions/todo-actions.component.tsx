import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import todoService from '../../../../service/todo.service';
import { APP_KEYS } from '../../../consts';
import { ITodo } from '../../../types/todo.types';
import {
  ActionsContainer,
  DeleteButton,
  Input,
  Label,
  Slider,
  ViewButton
} from './todo-actions.styled';

type TodoActionsProps = {
  todo: ITodo;
};

export const TodoActions = ({ todo }: TodoActionsProps) => {
  const [checkbox, setCheckbox] = useState<boolean>(todo.isCompleted);

  const queryClient = useQueryClient();

  const deleteTodo = useMutation((id: number) => todoService.deleteTodo(String(id)));

  const updateTodoStatus = useMutation((id: number) =>
    todoService.updateTodo(String(id), {
      ...todo,
      isCompleted: checkbox
    })
  );

  const checkboxOnChange = async () => {
    await setCheckbox((prev: boolean) => !prev);
    await updateTodoStatus.mutate(todo.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
      }
    });
  };
  return (
    <ActionsContainer>
      <Link to={APP_KEYS.BACKEND_KEYS.TODO(String(todo.id))}>
        <ViewButton>View</ViewButton>
      </Link>
      <DeleteButton
        onClick={
          () =>
            deleteTodo.mutate(todo.id, {
              onSuccess: () => {
                queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
              }
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        Delete
      </DeleteButton>
      <Label size="sm">
        <Input
          id="input"
          type="checkbox"
          disabled={false}
          checked={checkbox}
          onChange={checkboxOnChange}
        />
        <Slider />
      </Label>
    </ActionsContainer>
  );
};
