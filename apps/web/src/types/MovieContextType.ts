import type { Genres } from 'enums /Genres';
import type SortField from 'enums /SortField';
import type SortOrder from 'enums /SortOrder';
import type { MovieFilter } from './MovieFilter';

export interface MovieContextType {
  filter: MovieFilter;
  setSearch: (search: string) => void;
  setGenre: (genre: Genres | undefined) => void;
  setSort: (
    sortBy: SortField | undefined,
    sortOrder: SortOrder | undefined,
  ) => void;
}
