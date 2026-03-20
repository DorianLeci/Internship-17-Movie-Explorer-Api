import { editMovie } from '@api/editMovie';
import { useMutation } from '@tanstack/react-query';
import type { EditMovieDto } from '@tstypes/CreateMovieDto';
import toast from 'react-hot-toast';

interface EditMovieProps {
  onClose: () => void;
}
const useCreateMovie = ({ onClose }: EditMovieProps) => {
  return useMutation({
    mutationFn: (data: EditMovieDto) => editMovie(data),
    onSuccess: () => {
      toast.success('Movie edited successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error || 'Edting movie failed');
    },
  });
};

export default useCreateMovie;
