import FormInput from '@components/FormInput';
import MultiSelectInput from '@components/MultiSelectInput';
import { Box, Button, Typography } from '@mui/material';
import type { Genre } from '@tstypes/Genre';
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import GenreDisplayMap from '../MovieFilter/helpers/GenreDisplayMap';
import styles from './MovieModal.module.scss';

interface MovieModalProps<TFormValues extends FieldValues> {
  isOpen: boolean;
  onSubmit: SubmitHandler<TFormValues>;
  onClose: () => void;
  form: UseFormReturn<TFormValues>;
  genres: Genre[] | undefined;
  isSubmitting: boolean;
}

const MovieModal = <TFormValues extends FieldValues>({
  isOpen,
  onSubmit,
  onClose,
  form,
  genres,
  isSubmitting,
}: MovieModalProps<TFormValues>) => {
  const {
    register,
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
              label="Runtime (minutes)"
              type="number"
              fullWidth
              margin="normal"
              {...register('runtime')}
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
              {...register('rating')}
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
              {...register('popularity')}
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
              disabled={isSubmitting}
              sx={{
                mt: 2,
                color: 'black',
                fontSize: '20px',
                backgroundColor: 'var(--color-peach)',
              }}
            >
              {isSubmitting ? 'Adding movie...' : 'Add movie'}
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default MovieModal;
