interface Favorite {
  id: number;
  movieId: number;
}

export interface Movie {
  id: number;
  rating: number;
  title: string;
  releaseDate: string;
  posterUrl: string;
  favorite: Favorite | null;
}
