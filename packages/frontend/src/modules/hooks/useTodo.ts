import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { ITodo } from '../common/types/todo.types';
import todoService from '../service/todo.service';

export const useTodo = (id: string) => {
  const queryClient = useQueryClient();

  const {
    data: todo,
    isLoading,
    isError
  } = useQuery([APP_KEYS.QUERY_KEYS.TODO, id], () => todoService.getTodo(id), {
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });

  const updateTodoMutation = useMutation(
    (variables: { id: number | undefined; data: ITodo }) =>
      todoService.updateTodo(String(variables?.id), variables.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODO, id]);
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
        queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODO, id]);
        queryClient.refetchQueries(APP_KEYS.QUERY_KEYS.TODOS);
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
    todo,
    isLoading,
    isError,
    createTodo,
    updateTodo,
    deleteTodo
  };
};
