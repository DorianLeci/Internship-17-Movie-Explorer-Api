import type { MovieFilter } from '@tstypes/MovieFilter';
import GenreDisplayMap from '../components/MovieFilter/helpers/GenreDisplayMap';

const EmptyStateTitle = (filter: MovieFilter) => {
  const parts = [];
  if (filter.search) parts.push(`for "${filter.search}"`);
  if (filter.genre) parts.push(`in genre ${GenreDisplayMap[filter.genre]}`);

  return ` ${parts.join(' ')}`;
};

export default EmptyStateTitle;
