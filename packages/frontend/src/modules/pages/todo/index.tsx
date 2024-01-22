import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Label, Slider } from '../../common/components/todo/todo-actions';
import { Button, TodoCard } from '../../common/components/todo/todo-card';
import { TodoModal } from '../../common/components/todo/todo-modal';
import { ITodo } from '../../common/types/todo.types';
import { useTodo } from '../../hooks/useTodo';

export const TodoPage = () => {
  const { id } = useParams();
  const { todo, isLoading, isError, updateTodo } = useTodo(id as string);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const changeModalState = (state: boolean) => setModalOpen(state);

  useEffect(() => {
    if (todo) {
      setCheckbox(todo.isPrivate);
    }
  }, [todo]);

  const checkboxOnChange = () => {
    const updatedCheckbox = !checkbox;
    setCheckbox((prev) => !prev);
    updateTodo({ id: todo?.id, data: { ...todo, isPrivate: updatedCheckbox } as ITodo });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <>
      {isModalOpen && (
        <TodoModal onClose={changeModalState} isCreateMode={false} todoInitials={todo} />
      )}
      <TodoCard todo={todo as ITodo} />
      <Button onClick={() => changeModalState(true)}>Edit todo</Button>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '15px',
          marginLeft: '10px'
        }}
      >
        isPrivate
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
      </div>
    </>
  );
};
