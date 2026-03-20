import { Genres } from 'enums /Genres';

const GenreDisplayMap: Record<Genres, string> = {
  [Genres.ACTION]: 'Action',
  [Genres.ADVENTURE]: 'Adventure',
  [Genres.ANIMATION]: 'Animation',
  [Genres.COMEDY]: 'Comedy',
  [Genres.CRIME]: 'Crime',
  [Genres.DOCUMENTARY]: 'Documentary',
  [Genres.DRAMA]: 'Drama',
  [Genres.FAMILY]: 'Family',
  [Genres.FANTASY]: 'Fantasy',
  [Genres.HISTORY]: 'History',
  [Genres.HORROR]: 'Horror',
  [Genres.MUSIC]: 'Music',
  [Genres.MYSTERY]: 'Mystery',
  [Genres.ROMANCE]: 'Romance',
  [Genres.SCI_FI]: 'Sci-Fi',
  [Genres.THRILLER]: 'Thriller',
  [Genres.WAR]: 'War',
  [Genres.WESTERN]: 'Western',
};

export default GenreDisplayMap;
