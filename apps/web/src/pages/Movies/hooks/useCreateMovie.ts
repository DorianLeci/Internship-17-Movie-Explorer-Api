import { createMovie } from '@api/createMovie';
import { useMutation } from '@tanstack/react-query';
import type { CreateMovieDto } from '@tstypes/CreateMovieDto';
import toast from 'react-hot-toast';

interface CreateMovieProps {
  onClose: () => void;
}
const useCreateMovie = ({ onClose }: CreateMovieProps) => {
  return useMutation({
    mutationFn: (data: CreateMovieDto) => createMovie(data),
    onSuccess: () => {
      toast.success('Movie created successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error || 'Creating movie failed');
    },
  });
};

export default useCreateMovie;
