import { editMovie } from '@api/editMovie';
import { QueryKeys } from '@api/QueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditMovieDto } from '@tstypes/CreateMovieDto';
import toast from 'react-hot-toast';

interface EditMovieProps {
  onClose: () => void;
}

interface EditMovieMutation {
  id: number;
  data: EditMovieDto;
}
const useCreateMovie = ({ onClose }: EditMovieProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditMovieMutation) => editMovie(id, data),
    onSuccess: () => {
      toast.success('Movie edited successfully');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_MOVIES] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error || 'Edting movie failed');
    },
  });
};

export default useCreateMovie;
