import { useAllMovies } from '@api/allMovies';
import EmptyStateCard from '@components/EmptyStateCard';
import ErrorCard from '@components/ErrorCard';
import { useMovies } from '@hooks/useMovies';
import useReveal from '@hooks/useReveal';
import { useState } from 'react';
import CreateMovieModal from './components/Modal/CreateMovieModal';
import MovieCard from './components/MovieCard';
import MovieFilter from './components/MovieFilter';
import MovieSearch from './components/MovieSearch';
import MovieSort from './components/MovieSort';
import MoviesPageSkeleton from './components/Skeleton';
import EmptyStateTitle from './helpers/EmptyStateTitle';
import styles from './MoviesPage.module.scss';

interface MoviesPageProps {
  isAdmin?: boolean;
}
const MoviesPage = ({ isAdmin = false }: MoviesPageProps) => {
  const { filter } = useMovies();
  const {
    data: movies,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllMovies(filter);

  const visible = useReveal({ isLoading });

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <MovieSearch />
        <MovieSort />
        <MovieFilter />
        {isAdmin && (
          <button onClick={() => setModalOpen(true)}>+ Add Movie</button>
        )}
      </div>

      <CreateMovieModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className={styles.container}>
        {visible && <MoviesPageSkeleton />}

        {!visible && isError && (
          <ErrorCard message={error.message} onRetry={refetch} />
        )}

        {!visible && !isError && movies?.length === 0 && (
          <EmptyStateCard
            title="No films found"
            searchParams={EmptyStateTitle(filter)}
            subtitle={'Try something else'}
          />
        )}

        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
