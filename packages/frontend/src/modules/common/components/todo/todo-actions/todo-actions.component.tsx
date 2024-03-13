import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTodoActions } from '../../../../hooks/useTodoActions';
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
  const { deleteTodo, updateTodo, errorMsg } = useTodoActions();

  const deleteTodoHandler = () => {
    deleteTodo(todo.id);
  };

  const checkboxOnChange = () => {
    const updatedCheckbox = !todo.isCompleted;
    updateTodo({ id: todo?.id, data: { ...todo, isCompleted: updatedCheckbox } as ITodo });
  };

  React.useEffect(() => {
    if (errorMsg) {
      toast(String(errorMsg));
    }
  }, [errorMsg]);

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
          checked={todo.isCompleted}
          onChange={checkboxOnChange}
        />
        <Slider />
      </Label>
    </ActionsContainer>
  );
};
