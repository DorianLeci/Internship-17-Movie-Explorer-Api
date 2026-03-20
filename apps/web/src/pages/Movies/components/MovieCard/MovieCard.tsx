import defaultPoster from '@assets/images/default-poster.svg';
import DateFormat from '@helpers/DateFormat';
import type { Movie } from '@tstypes/Movie';
import { FaEdit, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  isAdmin?: boolean;
  onOpen: (id: number) => void;
}

const MovieCard = ({ movie, isAdmin = false, onOpen }: MovieCardProps) => {
  return (
    <Link to={`/movies/${movie.id}`} className={styles.card}>
      {movie.isFavorite && <FaStar className={styles.starIcon} size={55} />}
      <div className={styles.favoriteBtn}></div>
      {isAdmin && (
        <button
          className={styles.editButton}
          onClick={(e) => {
            e.preventDefault();
            onOpen(movie.id);
          }}
        >
          <FaEdit size={50} />
        </button>
      )}
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        className={styles.poster}
        src={movie.posterUrl ? `${movie.posterUrl}` : defaultPoster}
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
