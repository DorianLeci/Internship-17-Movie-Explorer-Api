import type { Genres } from 'enums /Genres';
import type SortField from 'enums /SortField';
import type SortOrder from 'enums /SortOrder';

export interface MovieFilter {
  sortBy: SortField | undefined;
  sortOrder: SortOrder | undefined;
  genre?: Genres | undefined;
  search?: string;
}
