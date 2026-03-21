import { createMovie } from '@api/createMovie';
import { QueryKeys } from '@api/QueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateMovieDto } from '@tstypes/CreateMovieDto';
import toast from 'react-hot-toast';

interface CreateMovieProps {
  onClose: () => void;
}
const useCreateMovie = ({ onClose }: CreateMovieProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieDto) => createMovie(data),
    onSuccess: () => {
      toast.success('Movie created successfully');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_MOVIES] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error || 'Creating movie failed');
    },
  });
};

export default useCreateMovie;
