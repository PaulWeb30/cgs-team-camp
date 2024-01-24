import { useMutation, useQueryClient } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { ITodo } from '../common/types/todo.types';
import todoService from '../service/todo.service';

export const useTodoActions = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation(
    (variables: { id: number | undefined; data: ITodo }) =>
      todoService.updateTodo(String(variables?.id), variables.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODO);
        queryClient.refetchQueries(APP_KEYS.QUERY_KEYS.TODOS);
      }
    }
  );

  const deleteTodoMutation = useMutation(
    (todoId: number) => todoService.deleteTodo(String(todoId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
      }
    }
  );

  const createTodoMutation = useMutation(
    (data: { title: string; description: string }) => todoService.createTodo(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
        queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODO);
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
    deleteTodo
  };
};
