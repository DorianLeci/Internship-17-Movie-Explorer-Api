import { useMovies } from '../../hooks/useMovies';
import style from './MovieSearch.module.scss';

export const MovieSearch = () => {
  const { filter, setSearch } = useMovies();
  const { search: query } = filter;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movies"
      value={query}
      onChange={handleChange}
      className={style.input}
    ></input>
  );
};
