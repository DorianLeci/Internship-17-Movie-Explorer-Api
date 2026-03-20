import * as yup from 'yup';

const movieSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    runtime: yup
      .number()
      .required('Runtime is required')
      .min(1, 'Runtime must be at least one minute'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 0')
      .max(10, 'Rating cannot exceed 10'),

    popularity: yup
      .number()
      .required('Popularity is required')
      .min(0, 'Popularity must be at least 0')
      .max(10, 'Popularity cannot exceed 10'),

    posterUrl: yup.string().url('Poster URL must be a valid URL').optional(),

    trailerKey: yup.string().url('Trailer URL must be a valid URL').optional(),

    releaseDate: yup
      .date()
      .required('Release date is required')
      .test('not-in-past', 'Release date can not be in the past', (value) => {
        const date = new Date(value);
        const now = new Date();

        return date.getTime() >= now.getTime();
      }),
    genres: yup.array().of(yup.string()).min(1, 'Select at least one genre'),
  })
  .required();

export default movieSchema;
