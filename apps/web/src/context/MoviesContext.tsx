import type { MovieFilter } from '@tstypes/MovieFilter';
import type { Genres } from 'enums /Genres';
import type SortField from 'enums /SortField';
import type SortOrder from 'enums /SortOrder';
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
  sortBy: undefined,
  sortOrder: undefined,
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

    if (filterState.sortBy) params.set('sortBy', filterState.sortBy);
    else params.delete('sortBy');

    if (filterState.sortOrder) params.set('sortOrder', filterState.sortOrder);
    else params.delete('sortOrder');

    setSearchParams(params, { replace: true });
  }, [filterState, setSearchParams]);

  const handleSearch = useCallback((newSearch: string) => {
    setFilterState((prev) => ({ ...prev, search: newSearch }));
  }, []);

  const handleGenreChange = useCallback((genre: Genres | undefined) => {
    setFilterState((prev) => ({ ...prev, genre }));
  }, []);

  const handleSortChange = useCallback(
    (sortBy: SortField | undefined, sortOrder: SortOrder | undefined) => {
      setFilterState((prev) => ({ ...prev, sortBy, sortOrder }));
    },
    [],
  );

  return (
    <MovieContext.Provider
      value={{
        filter: filterState,
        setSearch: handleSearch,
        setGenre: handleGenreChange,
        setSort: handleSortChange,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
