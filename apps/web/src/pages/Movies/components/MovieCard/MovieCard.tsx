import defaultPoster from '@assets/images/default-poster.svg';
import DateFormat from '@helpers/DateFormat';
import { useFavorites } from '@hooks/useFavorites';
import type { Movie } from '@tstypes/Movie';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id.toString());

  return (
    <Link to={`/movies/${movie.id}`} className={styles.card}>
      {favorite && <FaStar className={styles.starIcon} size={55} />}
      <div className={styles.favoriteBtn}></div>
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        className={styles.poster}
        src={
          movie.posterUrl
            ? `${TMDB_IMAGE_BASE}${movie.posterUrl}`
            : defaultPoster
        }
        alt={movie.title}
      />
      <div className={styles.info}>
        <p>Release date: {DateFormat(movie.releaseDate)}</p>
        <p className={styles.rating}>Rating: {movie.rating}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
