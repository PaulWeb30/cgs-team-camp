import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { ITodo } from '../common/types/todo.types';
import todoService from '../service/todo.service';

export const useTodoActions = (callback?: () => void) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation(
    (variables: { id: number | undefined; data: ITodo }) =>
      todoService.updateTodo(String(variables?.id), variables.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODO);
        queryClient.refetchQueries(APP_KEYS.QUERY_KEYS.TODOS);
        setErrorMsg('Todo updated successfully');
        if (callback) callback();
      },
      onError: (error) => {
        if (!(error instanceof AxiosError)) return;
        if (!error.response?.data) return;
        setErrorMsg(error?.response?.data?.message);
      }
    }
  );

  const deleteTodoMutation = useMutation(
    (todoId: number) => todoService.deleteTodo(String(todoId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
        setErrorMsg('Todo deleted successfully');
      },
      onError: (error) => {
        if (!(error instanceof AxiosError)) return;
        if (!error.response?.data) return;
        setErrorMsg(error?.response?.data?.message);
      }
    }
  );

  const createTodoMutation = useMutation(
    (data: { title: string; description: string }) => todoService.createTodo(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODO);
        setErrorMsg('Todo created successfully');
        if (callback) callback();
      },
      onError: (error) => {
        if (!(error instanceof AxiosError)) return;
        if (!error.response?.data) return;
        setErrorMsg(error?.response?.data?.message);
      }
    }
  );

  const createTodo = (data: { title: string; description: string }) => {
    createTodoMutation.mutate(data);
  };

  const updateTodo = (variables: { id: number | undefined; data: ITodo }) => {
    updateTodoMutation.mutate(variables);
  };

  const deleteTodo = (todoId: number) => {
    deleteTodoMutation.mutate(todoId);
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    errorMsg
  };
};
