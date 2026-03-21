import { useGenres } from '@api/genres';
import FormInput from '@components/FormInput';
import MultiSelectInput from '@components/MultiSelectInput';
import MOVIE_LIMITS from '@constants/movie';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import useEditMovie from '@pages/Movies/hooks/useEditMovie';
import type { Genre } from '@tstypes/Genre';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import GenreDisplayMap from '../MovieFilter/helpers/GenreDisplayMap';
import styles from './MovieModal.module.scss';
import {
  editMovieSchema,
  type EditMovieFormValues,
} from './validation/MovieSchema';

interface EditMovieModalProps {
  movieId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditMovieModal = ({ movieId, isOpen, onClose }: EditMovieModalProps) => {
  const { data: genres } = useGenres();
  const editMutation = useEditMovie({ onClose });

  const form = useForm<EditMovieFormValues>({
    resolver: yupResolver(editMovieSchema) as any,
    defaultValues: {
      genres: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  if (!movieId) return null;

  const onSubmit: SubmitHandler<EditMovieFormValues> = (data) => {
    editMutation.mutate({ id: movieId, data });
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
            Edit Movie
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
              disabled={editMutation.isPending}
              sx={{
                mt: 2,
                color: 'black',
                fontSize: '20px',
                backgroundColor: 'var(--color-peach)',
              }}
            >
              {editMutation.isPending ? 'Updating movie' : 'Update movie'}
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default EditMovieModal;
