import { useAllMovies } from '@api/allMovies';
import EmptyStateCard from '@components/EmptyStateCard';
import ErrorCard from '@components/ErrorCard';
import { useMovies } from '@hooks/useMovies';
import useReveal from '@hooks/useReveal';
import MovieCard from '@pages/Movies/components/MovieCard';
import MoviesPageSkeleton from '@pages/Movies/components/Skeleton';
import styles from './FavoriteMoviesPage.module.scss';

export const FavoriteMoviesPage = () => {
  const { filter } = useMovies();
  const {
    data: favoriteMovies,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllMovies(filter);
  const visible = useReveal({ isLoading });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {visible && <MoviesPageSkeleton />}

        {!visible && isError && (
          <ErrorCard message={error.message} onRetry={refetch} />
        )}

        {!visible && !isError && favoriteMovies?.length === 0 && (
          <EmptyStateCard
            title="No favorite movies found"
            subtitle="Add favorite movies"
          />
        )}

        {favoriteMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
