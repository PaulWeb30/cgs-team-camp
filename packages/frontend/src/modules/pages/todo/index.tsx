import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Input, Label, Slider } from '../../common/components/todo/todo-actions';
import { Button, TodoCard } from '../../common/components/todo/todo-card';
import { TodoModal } from '../../common/components/todo/todo-modal';
import { APP_KEYS } from '../../common/consts';
import { ITodo } from '../../common/types/todo.types';
import todoService from '../../service/todo.service';

export const TodoPage = () => {
  const { id } = useParams();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const {
    data: todo,
    isLoading,
    isError
  } = useQuery([APP_KEYS.QUERY_KEYS.TODO, id], () => todoService.getTodo(id as string), {
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (todo) {
      setCheckbox(todo.isPrivate);
    }
  }, [todo]);

  const changeModalState = (state: boolean) => setModalOpen(state);

  const updateTodoIsPrivate = useMutation((variables: { id: number | undefined; data: ITodo }) =>
    todoService.updateTodo(String(variables?.id), variables.data)
  );

  const checkboxOnChange = () => {
    const updatedCheckbox = !checkbox;

    setCheckbox(updatedCheckbox);

    updateTodoIsPrivate.mutate(
      { id: todo?.id, data: { ...todo, isPrivate: updatedCheckbox } as ITodo },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODO);
          queryClient.refetchQueries(APP_KEYS.QUERY_KEYS.TODOS);
        }
      }
    );
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
    </>
  );
};
