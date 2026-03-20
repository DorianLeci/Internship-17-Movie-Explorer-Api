import { useAllMovies } from '@api/allMovies';
import EmptyStateCard from '@components/EmptyStateCard';
import ErrorCard from '@components/ErrorCard';
import { useMovies } from '@hooks/useMovies';
import useReveal from '@hooks/useReveal';
import CreateMovieModal from './components/Modal/CreateMovieModal';
import EditMovieModal from './components/Modal/EditMovieModal';
import MovieCard from './components/MovieCard';
import MovieFilter from './components/MovieFilter';
import MovieSearch from './components/MovieSearch';
import MovieSort from './components/MovieSort';
import MoviesPageSkeleton from './components/Skeleton';
import EmptyStateTitle from './helpers/EmptyStateTitle';
import useModal from './hooks/useModal';
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

  const {
    isCreateModalOpen,
    isEditModalOpen,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    editingMovie,
  } = useModal();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <MovieSearch />
        <MovieSort />
        <MovieFilter />
        {isAdmin && <button onClick={openCreateModal}>+ Add Movie</button>}
      </div>

      <CreateMovieModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      <EditMovieModal
        movieId={editingMovie}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
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
          <MovieCard
            key={movie.id}
            movie={movie}
            isAdmin={isAdmin}
            onOpen={openEditModal}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
