import { useAllMovies } from '@api/allMovies';
import { ErrorCard } from '@components/ErrorCard/ErrorCard';
import { Spinner } from '@components/Spinner/Spinner';
import { useMovies } from '@hooks/useMovies';
import { useSpinner } from '@hooks/useSpinner';
import MovieCard from './components/MovieCard/MovieCard';
import MovieSearch from './components/MovieSearch';
import MovieSort from './components/MovieSort';
import styles from './MoviesPage.module.scss';

const MoviesPage = () => {
  const { filter } = useMovies();
  const { data: movies, isLoading, isError, refetch } = useAllMovies(filter);
  const showSpinner = useSpinner({ loading: isLoading });

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <MovieSearch />
        <MovieSort />
      </div>

      <div className={styles.container}>
        {showSpinner && <Spinner text="Loading movies..." />}
        {!showSpinner && isError && (
          <ErrorCard message={'Error'} onRetry={refetch} />
        )}
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
