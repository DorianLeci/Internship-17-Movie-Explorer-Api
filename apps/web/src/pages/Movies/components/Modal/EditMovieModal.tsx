import { useGenres } from '@api/genres';
import { yupResolver } from '@hookform/resolvers/yup';
import useEditMovie from '@pages/Movies/hooks/useEditMovie';
import { useForm, type SubmitHandler } from 'react-hook-form';
import MovieModal from './MovieModal';
import {
  createMovieSchema,
  type EditMovieFormValues,
} from './validation/MovieSchema';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditMovieModal = ({ isOpen, onClose }: MovieModalProps) => {
  const { data: genres } = useGenres();
  const editMutation = useEditMovie({ onClose });

  const onSubmit: SubmitHandler<EditMovieFormValues> = (data) => {
    editMutation.mutate(data);
  };

  const form = useForm<EditMovieFormValues>({
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

export default EditMovieModal;
