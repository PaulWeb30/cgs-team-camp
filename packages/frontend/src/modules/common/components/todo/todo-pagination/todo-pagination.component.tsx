import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { SPACES } from '../../../../theme';
import { useTodos } from '../../../../hooks/useTodos';

interface PaginationProps {
  count: number | undefined;
  page: number | undefined;
}

export const TodoPagination = ({ count, page }: PaginationProps) => {
  const { refetch } = useTodos();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValue = searchParams.get('page') || '1';
  const [pageValue, setPageValue] = React.useState<string>(initialValue);

  React.useEffect(() => {
    refetch();
  }, [pageValue]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageValue(String(value));
    setSearchParams((searchParamsURL) => {
      searchParamsURL.set('page', String(value));
      return searchParamsURL;
    });
  };

  return (
    <Pagination
      sx={{
        my: SPACES.sm,
        display: 'flex',
        justifyContent: 'center'
      }}
      count={count}
      page={page ? +page : 1}
      onChange={handleChange}
      defaultPage={1}
      variant="outlined"
      shape="rounded"
    />
  );
};
