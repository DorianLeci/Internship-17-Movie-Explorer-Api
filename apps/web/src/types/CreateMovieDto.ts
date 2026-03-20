export interface CreateMovieDto {
  title: string;
  description: string;
  runtime: number;
  rating: number;
  popularity: number;
  posterUrl?: string;
  trailerUrl?: string;
  releaseDate: Date;
  genres: (number | undefined)[];
}

export type EditMovieDto = Partial<CreateMovieDto>;
