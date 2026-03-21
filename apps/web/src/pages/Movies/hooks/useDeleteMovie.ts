import { deleteMovie } from '@api/deleteMovie';
import { QueryKeys } from '@api/QueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMovie(id),
    onSuccess: () => {
      toast.success('Movie deleted successfully');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_MOVIES] });
    },
    onError: (error: any) => {
      toast.error(error || 'Deleting movie failed');
    },
  });
};

export default useDeleteMovie;
