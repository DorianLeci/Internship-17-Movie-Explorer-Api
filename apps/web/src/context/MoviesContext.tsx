import type { MovieFilter } from '@tstypes/MovieFilter';
import type { Genres } from 'enums /Genres';
import SortField from 'enums /SortField';
import SortOrder from 'enums /SortOrder';
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import type { MovieContextType } from '../types/MovieContextType';

export const INITIAL_FILTER: MovieFilter = {
  search: '',
  genre: undefined,
  sortBy: SortField.POPULARITY,
  sortOrder: SortOrder.DESC,
};

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterState, setFilterState] = useState<MovieFilter>(INITIAL_FILTER);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filterState.search) params.set('search', filterState.search);
    else params.delete('search');

    if (filterState.genre) params.set('genre', filterState.genre);
    else params.delete('genre');

    params.set('sortBy', filterState.sortBy);

    params.set('sortOrder', filterState.sortOrder);

    setSearchParams(params, { replace: true });
  }, [filterState, setSearchParams]);

  const handleSearch = useCallback((newSearch: string) => {
    setFilterState((prev) => ({ ...prev, search: newSearch }));
  }, []);

  const handleGenreChange = useCallback((genre: Genres | undefined) => {
    setFilterState((prev) => ({ ...prev, genre }));
  }, []);

  const handleSortChange = useCallback((sortBy: SortField) => {
    setFilterState((prev) => ({ ...prev, sortBy }));
  }, []);

  const handleOrderChange = useCallback((sortOrder: SortOrder) => {
    setFilterState((prev) => ({ ...prev, sortOrder }));
  }, []);

  return (
    <MovieContext.Provider
      value={{
        filter: filterState,
        setSearch: handleSearch,
        setGenre: handleGenreChange,
        setSortField: handleSortChange,
        setSortOrder: handleOrderChange,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
