import { useGenres } from '@api/genres';
import { useMovies } from '@hooks/useMovies';
import { useToggle } from '@hooks/useToggle';
import styles from './MovieFilter.module.scss';

const MovieFilter = () => {
  const { filter, setGenre } = useMovies();
  const { data: genres } = useGenres();
  const { open, setOpen, toggle } = useToggle();

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.selectOption}>
        <div className={styles.inputLike} onClick={() => toggle()}>
          {filter.genre}
        </div>

        <div className={`${styles.options} ${open ? styles.active : ''}`}>
          <li onClick={() => setGenre(undefined)}>All genres</li>
          {genres?.map((genre) => (
            <li onClick={() => setGenre(genre.name)} key={genre.id}>
              {genre.name}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
