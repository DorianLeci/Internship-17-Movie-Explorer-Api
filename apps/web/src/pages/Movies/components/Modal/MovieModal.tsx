import { useGenres } from '@api/genres';
import FormInput from '@components/FormInput';
import MultiSelectInput from '@components/MultiSelectInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import useCreateMovie from '@pages/Movies/hooks/useCreateMovie';
import type { Genre } from '@tstypes/Genre';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import * as yup from 'yup';
import GenreDisplayMap from '../MovieFilter/helpers/GenreDisplayMap';
import styles from './AddMovieModal.module.scss';
import movieSchema from './validation/MovieSchema';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MovieFormValues = yup.InferType<typeof movieSchema>;

const MovieModal = ({ isOpen, onClose }: MovieModalProps) => {
  const { data: genres } = useGenres();
  const addMutation = useCreateMovie({ onClose });

  const onSubmit: SubmitHandler<MovieFormValues> = (data) => {
    addMutation.mutate(data);
  };

  const form = useForm<MovieFormValues>({
    resolver: yupResolver(movieSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      runtime: 1,
      rating: 1,
      popularity: 1,
      releaseDate: new Date(),
      genres: [],
    },
  });

  const {
    register: create,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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
              {...create('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <FormInput
              label="Description"
              fullWidth
              margin="normal"
              {...create('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              multiline
              rows={4}
            />

            <FormInput
              label="Runtime (minutes)"
              type="number"
              fullWidth
              margin="normal"
              {...create('runtime')}
              error={!!errors.runtime}
              helperText={errors.runtime?.message}
              slotProps={{
                htmlInput: { min: 1 },
              }}
            />

            <FormInput
              label="Rating (1-10)"
              type="number"
              fullWidth
              margin="normal"
              {...create('rating')}
              error={!!errors.rating}
              helperText={errors.rating?.message}
              slotProps={{
                htmlInput: { min: 1, max: 10, step: 0.5 },
              }}
            />

            <FormInput
              label="Popularity (0-10)"
              type="number"
              fullWidth
              margin="normal"
              {...create('popularity')}
              error={!!errors.popularity}
              helperText={errors.popularity?.message}
              slotProps={{
                htmlInput: { min: 0, max: 10, step: 0.5 },
              }}
            />

            <FormInput
              label="Poster URL"
              type="url"
              fullWidth
              margin="normal"
              {...create('posterUrl')}
              error={!!errors.posterUrl}
              helperText={errors.posterUrl?.message}
            />

            <FormInput
              label="Trailer URL"
              type="url"
              fullWidth
              margin="normal"
              {...create('trailerKey')}
              error={!!errors.trailerKey}
              helperText={errors.trailerKey?.message}
            />

            <FormInput
              label="Release Date"
              type="date"
              fullWidth
              margin="normal"
              {...create('releaseDate')}
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
              {addMutation.isPending ? 'Adding movie...' : 'Add movie'}
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default MovieModal;
