import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTodo } from '../../../../hooks/useTodo';
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
  const { deleteTodo, updateTodo } = useTodo(String(todo.id));

  const [checkbox, setCheckbox] = useState<boolean>(todo.isCompleted);

  const deleteTodoHandler = () => {
    deleteTodo(todo.id);
  };

  const checkboxOnChange = async () => {
    const updatedCheckbox = !checkbox;
    setCheckbox((prev: boolean) => !prev);
    updateTodo({ id: todo?.id, data: { ...todo, isCompleted: updatedCheckbox } as ITodo });
  };
  return (
    <ActionsContainer>
      <Link to={APP_KEYS.BACKEND_KEYS.TODO(String(todo.id))}>
        <ViewButton>View</ViewButton>
      </Link>
      <DeleteButton onClick={deleteTodoHandler}>Delete</DeleteButton>
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
