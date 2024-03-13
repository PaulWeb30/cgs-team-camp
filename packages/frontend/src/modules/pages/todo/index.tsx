import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoBack } from '../../common/components/todo/goBack/goBack.component';
import { Loader } from '../../common/components/todo/loader';
import { Input, Label, Slider } from '../../common/components/todo/todo-actions';
import { Button, TodoCard } from '../../common/components/todo/todo-card';
import { TodoModal } from '../../common/components/todo/todo-modal';
import { ITodo } from '../../common/types/todo.types';
import { useTodo } from '../../hooks/useTodo';
import { useTodoActions } from '../../hooks/useTodoActions';

export const TodoPage = () => {
  const { id } = useParams();
  const { todo, isLoading, isError, errorMsg } = useTodo(id as string);

  const { updateTodo, errorMsg: errorMsgActions } = useTodoActions();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const changeModalState = (state: boolean) => setModalOpen(state);

  useEffect(() => {
    if (todo) {
      setCheckbox(todo.isPrivate);
      setIsCompleted(todo.isCompleted);
    }
  }, [todo]);

  const checkboxOnChange = () => {
    const updatedCheckbox = !checkbox;
    // setCheckbox((prev) => !prev);
    updateTodo({ id: todo?.id, data: { ...todo, isPrivate: updatedCheckbox } as ITodo });
  };

  const completedOnChange = () => {
    const updatedCheckbox = !isCompleted;
    // setIsCompleted((prev) => !prev);
    updateTodo({ id: todo?.id, data: { ...todo, isCompleted: updatedCheckbox } as ITodo });
  };

  React.useEffect(() => {
    if (errorMsgActions) {
      toast(String(errorMsgActions));
    }
  }, [errorMsgActions]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div>
        <h1>Error happened - {errorMsg}</h1>
        <GoBack />
      </div>
    );
  }

  return (
    <>
      {isModalOpen && (
        <TodoModal onClose={changeModalState} isCreateMode={false} todoInitials={todo} />
      )}
      <TodoCard todo={todo as ITodo} />

      <div
        style={{
          marginLeft: '15px'
        }}
      >
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
          Private
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '15px',
            marginLeft: '10px'
          }}
        >
          Completed
          <Label size="sm">
            <Input
              id="input"
              type="checkbox"
              disabled={false}
              checked={isCompleted}
              onChange={completedOnChange}
            />
            <Slider />
          </Label>
        </div>
        <GoBack />
      </div>
    </>
  );
};
