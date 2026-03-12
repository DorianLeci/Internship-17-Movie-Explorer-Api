import { useNavigate } from 'react-router-dom';
import { EmptyStateCard } from '../../components/EmptyStateCard/EmptyStateCard';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { useFavorites } from '../../hooks/useFavorites';
import { useSpinner } from '../../hooks/useSpinner';
import styles from './FavoriteMoviesPage.module.scss';

export const FavoriteMoviesPage = () => {
  const navigate = useNavigate();
  const { favoriteMovies, loading, error, refetch } = useFavorites();
  const showSpinner = useSpinner({ loading });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {showSpinner && <Spinner text="Loading favorite movies..." />}
        {!showSpinner && error && (
          <ErrorCard message={error} onRetry={refetch} />
        )}
        {!showSpinner &&
          !error &&
          (!favoriteMovies || favoriteMovies.length === 0) && (
            <EmptyStateCard
              title="You have no favorite movies yet"
              subtitle="Add some movies to your favorites to see them here"
            />
          )}
        {favoriteMovies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
