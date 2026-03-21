import { useGenres } from '@api/genres';
import FormInput from '@components/FormInput';
import MultiSelectInput from '@components/MultiSelectInput';
import MOVIE_LIMITS from '@constants/movie';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import useCreateMovie from '@pages/Movies/hooks/useCreateMovie';
import type { Genre } from '@tstypes/Genre';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import GenreDisplayMap from '../MovieFilter/helpers/GenreDisplayMap';
import styles from './MovieModal.module.scss';
import {
  createMovieSchema,
  type CreateMovieFormValues,
} from './validation/MovieSchema';

interface CreateMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMovieModal = ({ isOpen, onClose }: CreateMovieModalProps) => {
  const { data: genres } = useGenres();
  const addMutation = useCreateMovie({ onClose });

  const form = useForm<CreateMovieFormValues>({
    resolver: yupResolver(createMovieSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      runtime: MOVIE_LIMITS.RUNTIME.DEFAULT_VALUE,
      rating: MOVIE_LIMITS.RATING.DEFAULT_VALUE,
      popularity: MOVIE_LIMITS.POPULARITY.DEFAULT_VALUE,
      releaseDate: undefined,
      genres: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<CreateMovieFormValues> = (data) => {
    addMutation.mutate(data);
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <Box
          sx={{
            position: 'relative',
            maxWidth: 600,
            margin: '0px auto',
            padding: 4,
            boxShadow: 'var(--card-shadow)',
            borderRadius: 2,
            background: 'var(--card-bg)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontSize: '28px',
              color: 'white',
              textShadow: 'var(--text-shadow-black)',
              textAlign: 'center',
            }}
          >
            Add New Movie
          </Typography>

          <button onClick={onClose} className={styles.closeBtn}>
            <FaTimes size={30} color="white" />
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Title"
              fullWidth
              margin="normal"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <FormInput
              label="Description"
              fullWidth
              margin="normal"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              multiline
              rows={4}
            />

            <FormInput
              label={`Runtime (${MOVIE_LIMITS.RUNTIME.MIN}- ${MOVIE_LIMITS.RUNTIME.MAX}) minutes`}
              type="number"
              fullWidth
              margin="normal"
              {...register('runtime')}
              error={!!errors.runtime}
              helperText={errors.runtime?.message}
              slotProps={{
                htmlInput: { step: MOVIE_LIMITS.RUNTIME.STEP },
              }}
            />

            <FormInput
              label={`Rating (${MOVIE_LIMITS.RATING.MIN}- ${MOVIE_LIMITS.RATING.MAX})`}
              type="number"
              fullWidth
              margin="normal"
              {...register('rating')}
              error={!!errors.rating}
              helperText={errors.rating?.message}
              slotProps={{
                htmlInput: { step: MOVIE_LIMITS.RATING.STEP },
              }}
            />

            <FormInput
              label={`Popularity (${MOVIE_LIMITS.POPULARITY.MIN}- ${MOVIE_LIMITS.POPULARITY.MAX})`}
              type="number"
              fullWidth
              margin="normal"
              {...register('popularity')}
              error={!!errors.popularity}
              helperText={errors.popularity?.message}
              slotProps={{
                htmlInput: { step: MOVIE_LIMITS.POPULARITY.STEP },
              }}
            />

            <FormInput
              label="Poster URL"
              type="url"
              fullWidth
              margin="normal"
              {...register('posterUrl')}
              error={!!errors.posterUrl}
              helperText={errors.posterUrl?.message}
            />

            <FormInput
              label="Trailer URL"
              type="url"
              fullWidth
              margin="normal"
              {...register('trailerKey')}
              error={!!errors.trailerKey}
              helperText={errors.trailerKey?.message}
            />

            <FormInput
              label="Release Date"
              type="date"
              fullWidth
              margin="normal"
              {...register('releaseDate')}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate?.message}
              InputLabelProps={{ shrink: true }}
            />

            <Controller
              control={control}
              name="genres"
              render={({ field, fieldState }) => (
                <>
                  <MultiSelectInput
                    value={field.value}
                    onChange={field.onChange}
                    options={
                      genres?.map((genre: Genre) => ({
                        id: genre.id,
                        name: GenreDisplayMap[genre.name],
                      })) ?? []
                    }
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <span className={styles.genreError}>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={addMutation.isPending}
              sx={{
                mt: 2,
                color: 'black',
                fontSize: '20px',
                backgroundColor: 'var(--color-peach)',
              }}
            >
              {addMutation.isPending ? 'Adding...' : 'Add Movie'}
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default CreateMovieModal;
