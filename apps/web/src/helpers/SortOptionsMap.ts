import SortField from 'enums /SortField';

export const SortOptionsMap: Record<SortField, string> = {
  [SortField.POPULARITY]: 'Popularity',
  [SortField.RATING]: 'Rating',
  [SortField.RELEASE_DATE]: 'Release Date',
};
