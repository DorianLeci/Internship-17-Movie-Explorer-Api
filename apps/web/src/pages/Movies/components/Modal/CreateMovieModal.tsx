import { useGenres } from '@api/genres';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreateMovie from '@pages/Movies/hooks/useCreateMovie';
import { useForm, type SubmitHandler } from 'react-hook-form';
import MovieModal from './MovieModal';
import {
  createMovieSchema,
  type CreateMovieFormValues,
} from './validation/MovieSchema';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMovieModal = ({ isOpen, onClose }: MovieModalProps) => {
  const { data: genres } = useGenres();
  const addMutation = useCreateMovie({ onClose });

  const onSubmit: SubmitHandler<CreateMovieFormValues> = (data) => {
    addMutation.mutate(data);
  };

  const form = useForm<CreateMovieFormValues>({
    resolver: yupResolver(createMovieSchema) as any,
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

  return (
    <MovieModal
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      form={form}
      genres={genres}
      isSubmitting={addMutation.isPending}
    ></MovieModal>
  );
};

export default CreateMovieModal;
