import { createFavorite, removeFavorite } from '@api/favorite';
import { QueryKeys } from '@api/QueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface ToggleFavoriteArgs {
  id: number | undefined;
  isFavorite: boolean;
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isFavorite }: ToggleFavoriteArgs) => {
      if (isFavorite) {
        return removeFavorite(id);
      } else {
        return createFavorite(id);
      }
    },
    onSuccess: (_data, variables) => {
      toast.success(
        variables.isFavorite ? 'Removed from favorites' : 'Added to favorites',
      );
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === QueryKeys.MOVIE &&
          query.queryKey[1] === variables.id,
      });
      queryClient.refetchQueries({ queryKey: [QueryKeys.FAVORITE_MOVIES] });
    },
    onError: (error: any) => {
      toast.error(error || 'Something went wrong');
    },
  });
};
