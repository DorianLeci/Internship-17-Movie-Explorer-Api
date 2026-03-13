import type { MovieFilter } from '@tstypes/MovieFilter';
import type { Genres } from 'enums /Genres';
import SortField from 'enums /SortField';
import SortOrder from 'enums /SortOrder';

const getFilterFromURL = (searchParams: URLSearchParams): MovieFilter => {
  const params = Object.fromEntries([...searchParams]);

  return {
    search: params.search || '',
    genre: params.genre as Genres,
    sortBy: (params.sortBy as SortField) || SortField.POPULARITY,
    sortOrder: (params.sortOrder as SortOrder) || SortOrder.DESC,
  };
};

export default getFilterFromURL;
