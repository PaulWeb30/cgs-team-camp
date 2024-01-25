import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useTodos } from '../../../../hooks/useTodos';
import { SearchInput } from './todo-search.styled';

export const TodoSearch = () => {
  const { refetch } = useTodos();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get('search') || '';

  const [value, setValue] = React.useState<string>(initialValue);
  const debouncedValue = useDebounce(value, 500);

  const inputHandler = (inputValue: string) => {
    setValue(inputValue);
    setSearchParams((searchParamsURL) => {
      searchParamsURL.set('search', inputValue);
      return searchParamsURL;
    });
  };

  // React.useEffect(() => {
  //   if (value) {
  //     setSearchParams({ search: value });
  //   }
  // }, []);

  React.useEffect(() => {
    refetch();
  }, [debouncedValue]);

  return (
    <SearchInput
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => inputHandler(e.target.value)}
    />
  );
};
