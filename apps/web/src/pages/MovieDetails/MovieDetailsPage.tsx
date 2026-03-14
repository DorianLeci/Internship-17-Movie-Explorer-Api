import { useMovieById } from '@api/movie';
import useReveal from '@hooks/useReveal';
import { AppPaths } from '@routes/paths';
import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MoveDetailsPage.module.scss';
import { MovieCast } from './components/MovieCast/MovieCast';
import { MovieCrew } from './components/MovieCrew/MovieCrew';
import { MovieReviews } from './components/MovieReview/MovieReview';
import MovieDetailsSkeleton from './components/Skeleton/MovieDetailsSkeleton';
import { useToggleFavorite } from './hooks/useToggleFavorite';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? Number(id) : undefined;

  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useMovieById(movieId);
  const visible = useReveal({ isLoading });

  const toggleFavoriteMutation = useToggleFavorite();

  const isFavorite = !!movie?.favorite;

  useEffect(() => {
    if (!id || error) {
      navigate(AppPaths.NOT_FOUND, { replace: true });
    }
  }, [error, movieId, navigate]);

  return (
    <div className={styles.container}>
      {visible && <MovieDetailsSkeleton />}

      {!visible && movie && (
        <>
          <section className={styles.action}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              <FaArrowLeft size={40} />
            </button>

            <button
              className={`${styles.toggleFavoriteButton} ${isFavorite ? styles.remove : styles.add}`}
              onClick={() =>
                toggleFavoriteMutation.mutate({
                  id: movieId,
                  isFavorite,
                })
              }
            >
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </section>

          <section className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.additional}>
              <p className={styles.overview}>{movie.description}</p>
              <p className={styles.runtime}>
                <strong className={styles.label}>Runtime: </strong>
                <span className={styles.value}>{movie.runtime} min</span>
              </p>
              <p className={styles.genres}>
                <strong className={styles.label}>Genres: </strong>
                {movie.genres.map((g) => (
                  <span key={g.id} className={styles.value}>
                    {g.name}
                  </span>
                ))}
              </p>
            </div>
          </section>

          <MovieCast cast={movie.topCast} />
          <MovieCrew crew={movie.topCrew} />
          <MovieReviews reviews={movie.reviews} />
          {/* <MovieTrailer videos={movie.videos?.results} /> */}
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
