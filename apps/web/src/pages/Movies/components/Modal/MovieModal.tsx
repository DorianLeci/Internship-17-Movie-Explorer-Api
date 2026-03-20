import { useGenres } from '@api/genres';
import FormInput from '@components/FormInput';
import MultiSelectInput from '@components/MultiSelectInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { Controller, FormContainer, useForm } from 'react-hook-form-mui';
import { FaTimes } from 'react-icons/fa';
import * as yup from 'yup';
import styles from './AddMovieModal.module.scss';
import movieSchema from './validation/MovieSchema';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MovieFormValues = yup.InferType<typeof movieSchema>;

const MovieModal = ({ isOpen, onClose }: MovieModalProps) => {
  const { data: genres } = useGenres();

  const {
    register: login,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormValues>({
    resolver: yupResolver(movieSchema) as any,
    defaultValues: {
      genres: [],
    },
  });

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

          <FormContainer>
            <FormInput label="Title" fullWidth margin="normal" required />

            <FormInput
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />

            <FormInput
              label="Runtime (minutes)"
              type="number"
              fullWidth
              margin="normal"
              required
              slotProps={{
                htmlInput: { min: 1 },
              }}
            />

            <FormInput
              label="Rating (1-10)"
              type="number"
              fullWidth
              margin="normal"
              required
              slotProps={{
                htmlInput: { min: 1, max: 10, step: 0.5 },
              }}
            />

            <FormInput
              label="Popularity (0-10)"
              type="number"
              fullWidth
              margin="normal"
              required
              slotProps={{
                htmlInput: { min: 0, max: 10, step: 0.5 },
              }}
            />

            <FormInput
              label="Poster URL"
              type="url"
              fullWidth
              margin="normal"
            />

            <FormInput
              label="Trailer URL"
              type="url"
              fullWidth
              margin="normal"
            />

            <FormInput
              label="Release Date"
              type="date"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />

            <Controller
              control={control}
              name="genres"
              render={({ field }) => (
                <MultiSelectInput {...field} required options={genres ?? []} />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                color: 'black',
                fontSize: '20px',
                backgroundColor: 'var(--color-peach)',
              }}
            >
              Add Movie
            </Button>
          </FormContainer>
        </Box>
      </div>
    </div>
  );
};

export default MovieModal;
