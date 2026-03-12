import { useAllMovies } from '@api/allMovies';
import { useMovies } from 'hooks/useMovies';
import { useNavigate } from 'react-router-dom';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieSearch } from '../../components/MovieSearch/MovieSearch';
import { MovieSort } from '../../components/MovieSort/MovieSort';
import { Spinner } from '../../components/Spinner/Spinner';
import { useSpinner } from '../../hooks/useSpinner';
import styles from './MoviesPage.module.scss';

const MoviesPage = () => {
  const navigate = useNavigate();
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

export default MoviesPage;
