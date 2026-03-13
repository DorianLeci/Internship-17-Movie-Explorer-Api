import { useMovies } from '@hooks/useMovies';
import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import style from './MovieSearch.module.scss';

const MovieSearch = () => {
  const { filter, setSearch } = useMovies();
  const { search: query } = filter;
  const [internalValue, setInternalValue] = useState(query);

  const debouncedSetSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearch(value);
    }, 300);
  }, [setSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movies"
      value={internalValue}
      onChange={handleChange}
      className={style.input}
    ></input>
  );
};

export default MovieSearch;
