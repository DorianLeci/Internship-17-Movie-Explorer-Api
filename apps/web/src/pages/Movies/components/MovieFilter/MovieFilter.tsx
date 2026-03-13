import { useGenres } from '@api/genres';
import { useMovies } from '@hooks/useMovies';
import { useToggle } from '@hooks/useToggle';
import type { Genres } from 'enums /Genres';
import styles from './MovieFilter.module.scss';
import GenreDisplayMap from './helpers/GenreDisplayMap';

const MovieFilter = () => {
  const { filter, setGenre } = useMovies();
  const { data: genres } = useGenres();
  const { open, setOpen, toggle } = useToggle();

  const handleGenreChange = (genre: Genres) => {
    setGenre(genre);
    setOpen(false);
  };

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.selectOption}>
        <div className={styles.inputLike} onClick={() => toggle()}>
          {filter.genre ? GenreDisplayMap[filter.genre] : 'All genres'}
        </div>

        <div className={`${styles.options} ${open ? styles.active : ''}`}>
          <li onClick={() => setGenre(undefined)}>All genres</li>
          {genres?.map((genre) => (
            <li onClick={() => handleGenreChange(genre.name)} key={genre.id}>
              {GenreDisplayMap[genre.name]}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
