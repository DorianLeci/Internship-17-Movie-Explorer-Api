import type { Genres } from 'enums /Genres';
import type { Movie } from './Movie';
import type { CastMember, CrewMember } from './MovieMember';
import type { MovieReview } from './MovieReview';

export interface MovieDetails extends Movie {
  runtime: number;
  description: string;
  genres: { id: number; name: Genres }[];

  topCast: CastMember[];
  topCrew: CrewMember[];

  trailerKey: string | null;

  reviews: MovieReview[];
}

export type UpdateMovie = Partial<MovieDetails>;
