import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import todoService from '../service/todo.service';

export const useTodo = (id: string) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const {
    data: todo,
    isLoading,
    isError
  } = useQuery([APP_KEYS.QUERY_KEYS.TODO, id], () => todoService.getTodo(id), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      if (!(error instanceof AxiosError)) return;
      if (!error.response?.data) return;
      setErrorMsg(error?.response?.data?.message);
    }
  });

  return {
    todo,
    isLoading,
    isError,
    errorMsg
  };
};
