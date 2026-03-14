import type { Movie } from './Movie';
import type { CastMember, CrewMember } from './MovieMember';
import type { MovieReview } from './MovieReview';
import type { MovieVideo } from './MovieVideo';

export interface MovieDetails extends Movie {
  runtime: number;
  description: string;
  genres: { id: number; name: string }[];

  topCast: CastMember[];
  topCrew: CrewMember[];

  reviews: MovieReview[];

  videos?: {
    results: MovieVideo[];
  };
}
