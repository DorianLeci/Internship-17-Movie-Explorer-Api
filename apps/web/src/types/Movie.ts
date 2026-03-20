export interface Movie {
  id: number;
  rating: number;
  title: string;
  releaseDate: string;
  posterUrl: string | null;
  isFavorite: boolean | undefined;
}
