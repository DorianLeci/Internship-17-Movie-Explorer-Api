import { useFavoriteMovies } from '@api/favoriteMovies';
import EmptyStateCard from '@components/EmptyStateCard';
import ErrorCard from '@components/ErrorCard';
import useReveal from '@hooks/useReveal';
import MovieCard from '@pages/Movies/components/MovieCard';
import MoviesPageSkeleton from '@pages/Movies/components/Skeleton';
import styles from './FavoriteMoviesPage.module.scss';

const FavoriteMoviesPage = () => {
  const {
    data: favoriteMovies,
    isLoading,
    isError,
    error,
    refetch,
  } = useFavoriteMovies();
  const visible = useReveal({ isLoading: isLoading });

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

export default FavoriteMoviesPage;
