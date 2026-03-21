import defaultPoster from '@assets/images/default-poster.svg';
import DateFormat from '@helpers/DateFormat';
import useDeleteMovie from '@pages/Movies/hooks/useDeleteMovie';
import swalStyles from '@styles/swal.module.scss';
import type { Movie } from '@tstypes/Movie';
import { FaEdit, FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  isAdmin?: boolean;
  onOpen: (id: number) => void;
}

const MovieCard = ({ movie, isAdmin = false, onOpen }: MovieCardProps) => {
  const deleteMutation = useDeleteMovie();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    Swal.fire({
      title: 'Delete Movie?',
      text: `Are you sure you want to delete "${movie.title}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      backdrop: 'rgba(0,0,0,0.8)',
      customClass: {
        popup: swalStyles.popup,
        confirmButton: swalStyles.confirm,
        cancelButton: swalStyles.cancel,
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(movie.id);
    });
  };

  return (
    <Link to={`/movies/${movie.id}`} className={styles.card}>
      {movie.isFavorite && <FaStar className={styles.starIcon} size={55} />}
      <div className={styles.favoriteBtn}></div>
      {isAdmin && (
        <>
          <button
            className={styles.editButton}
            onClick={(e) => {
              e.preventDefault();
              onOpen(movie.id);
            }}
          >
            <FaEdit size={50} />
          </button>

          <button className={styles.deleteButton} onClick={handleDelete}>
            <FaTrash size={50} />
          </button>
        </>
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
