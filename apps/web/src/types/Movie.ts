export interface Movie {
  id: number;
  rating: number;
  title: string;
  popularity: number;
  releaseDate: string;
  posterUrl: string | null;
  isFavorite: boolean | undefined;
}
