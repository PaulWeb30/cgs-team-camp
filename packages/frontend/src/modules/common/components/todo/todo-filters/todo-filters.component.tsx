import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTodos } from '../../../../hooks/useTodos';
import { FilterButton, FilterButtonContainer } from './todo-filters.styled';

export const TodoFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { refetch } = useTodos();

  const FILTERS: string[] = ['all', 'private', 'public', 'completed'];

  const initialValue = searchParams.get('status') || 'all';

  const [activeFilter, setActiveFilter] = React.useState<string>(initialValue);

  React.useEffect(() => {
    refetch();
  }, [activeFilter]);

  const buttonHandler = (filter: string) => {
    setActiveFilter(filter);
    setSearchParams((searchParamsURL) => {
      searchParamsURL.set('status', filter);
      return searchParamsURL;
    });
  };
  return (
    <FilterButtonContainer>
      {FILTERS.map((filter) => (
        <FilterButton
          key={filter}
          active={activeFilter === filter}
          onClick={() => buttonHandler(filter)}
        >
          {filter}
        </FilterButton>
      ))}
    </FilterButtonContainer>
  );
};
