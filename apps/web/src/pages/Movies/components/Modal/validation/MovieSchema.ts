import MOVIE_LIMITS from '@constants/movie';
import * as yup from 'yup';

const movieSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    runtime: yup
      .number()
      .transform((value, originValue) =>
        originValue === '' ? undefined : value,
      )
      .required('Runtime is required')
      .min(
        MOVIE_LIMITS.RUNTIME.MIN,
        `Runtime must be at least ${MOVIE_LIMITS.RUNTIME.MIN} minute`,
      )
      .max(
        MOVIE_LIMITS.RUNTIME.MAX,
        `Runtime cannot exceed ${MOVIE_LIMITS.RUNTIME.MAX}`,
      ),

    rating: yup
      .number()
      .transform((value, originValue) =>
        originValue === '' ? undefined : value,
      )
      .required('Rating is required')
      .min(
        MOVIE_LIMITS.RATING.MIN,
        `Rating must be at least ${MOVIE_LIMITS.RATING.MIN}`,
      )
      .max(
        MOVIE_LIMITS.RATING.MAX,
        `Rating cannot exceed ${MOVIE_LIMITS.RATING.MAX}`,
      ),

    popularity: yup
      .number()
      .transform((value, originValue) =>
        originValue === '' ? undefined : value,
      )
      .required('Popularity is required')
      .min(
        MOVIE_LIMITS.POPULARITY.MIN,
        `Popularity must be at least ${MOVIE_LIMITS.POPULARITY.MIN}`,
      )
      .max(
        MOVIE_LIMITS.POPULARITY.MAX,
        `Popularity cannot exceed ${MOVIE_LIMITS.POPULARITY.MAX}`,
      ),

    posterUrl: yup
      .string()
      .transform((value, originValue) =>
        originValue.trim() === '' ? undefined : value,
      )
      .url('Poster URL must be a valid URL')
      .optional(),

    trailerKey: yup
      .string()
      .transform((value, originValue) =>
        originValue.trim() === '' ? undefined : value,
      )
      .url('Trailer URL must be a valid URL')
      .optional(),

    releaseDate: yup
      .date()
      .transform((value, originValue) =>
        originValue === '' ? undefined : value,
      )
      .required('Release date is required')
      .test('not-in-past', 'Release date can not be in the past', (value) => {
        const date = new Date(value);
        const now = new Date();

        return date.getTime() >= now.getTime();
      }),
    genres: yup
      .array()
      .required()
      .of(yup.number())
      .min(1, 'Select at least one genre'),
  })
  .required();

export const editMovieSchema = yup.object({
  title: yup
    .string()
    .transform((value, originValue) => (originValue === '' ? undefined : value))
    .optional(),
  description: yup
    .string()
    .transform((value, originValue) => (originValue === '' ? undefined : value))
    .optional(),
  runtime: yup
    .number()
    .transform((value, originValue) => (originValue === '' ? undefined : value))
    .optional()
    .min(
      MOVIE_LIMITS.RUNTIME.MIN,
      `Runtime must be at least ${MOVIE_LIMITS.RUNTIME.MIN} minute`,
    )
    .max(
      MOVIE_LIMITS.RUNTIME.MAX,
      `Runtime cannot exceed ${MOVIE_LIMITS.RUNTIME.MAX}`,
    ),

  rating: yup
    .number()
    .transform((value, originValue) => (originValue === '' ? undefined : value))
    .optional()
    .min(
      MOVIE_LIMITS.RATING.MIN,
      `Rating must be at least ${MOVIE_LIMITS.RATING.MIN}`,
    )
    .max(
      MOVIE_LIMITS.RATING.MAX,
      `Rating cannot exceed ${MOVIE_LIMITS.RATING.MAX}`,
    ),

  popularity: yup
    .number()
    .transform((value, originValue) => (originValue === '' ? undefined : value))
    .optional()
    .min(
      MOVIE_LIMITS.POPULARITY.MIN,
      `Popularity must be at least ${MOVIE_LIMITS.POPULARITY.MIN}`,
    )
    .max(
      MOVIE_LIMITS.POPULARITY.MAX,
      `Popularity cannot exceed ${MOVIE_LIMITS.POPULARITY.MAX}`,
    ),

  posterUrl: yup
    .string()
    .transform((value, originValue) =>
      originValue.trim() === '' ? undefined : value,
    )
    .url('Poster URL must be a valid URL')
    .optional(),

  trailerKey: yup
    .string()
    .transform((value, originValue) =>
      originValue.trim() === '' ? undefined : value,
    )
    .url('Trailer URL must be a valid URL')
    .optional(),

  releaseDate: yup
    .date()
    .transform((value, originValue) => (originValue === '' ? undefined : value))
    .optional()
    .test('not-in-past', 'Release date can not be in the past', (value) => {
      if (!value) return true;
      const date = new Date(value);
      const now = new Date();

      return date.getTime() >= now.getTime();
    }),
  genres: yup
    .array()
    .transform((value, originValue) =>
      originValue.length === 0 ? undefined : value,
    )
    .optional()
    .of(yup.number()),
});

export const createMovieSchema = movieSchema;

export type CreateMovieFormValues = yup.InferType<typeof createMovieSchema>;
export type EditMovieFormValues = yup.InferType<typeof editMovieSchema>;
