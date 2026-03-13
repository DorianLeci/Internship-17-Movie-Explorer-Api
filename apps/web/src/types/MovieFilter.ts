import type { Genres } from 'enums /Genres';
import type SortField from 'enums /SortField';
import type SortOrder from 'enums /SortOrder';

export interface MovieFilter {
  sortBy: SortField;
  sortOrder: SortOrder;
  genre?: Genres | undefined;
  search?: string;
}
