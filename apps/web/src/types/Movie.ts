import type { Favorite } from './Favorite';

export interface Movie {
  id: number;
  rating: number;
  title: string;
  releaseDate: string;
  posterUrl: string;
  favorite: Favorite | null;
}
