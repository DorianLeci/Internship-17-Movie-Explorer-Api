import SortField from 'enums /SortField';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { SortOptionsMap } from '../../helpers/SortOptionsMap';
import { useMovies } from '../../hooks/useMovies';
import { useToggle } from '../../hooks/useToggle';
import styles from './MovieSort.module.scss';

export const MovieSort = () => {
  const { filter, setSort } = useMovies();
  const { open, setOpen, toggle } = useToggle();

  const handleSelect = (value: SortField) => {
    setSort(value);
    setOpen(false);
  };

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.selectOption}>
        <div
          className={`${styles.inputLike} ${filter.search ? styles.disabled : ''}`}
          onClick={() => toggle()}
        >
          {SortOptionsMap[filter.sortBy || SortField.POPULARITY]}
        </div>

        <div className={`${styles.options} ${open ? styles.active : ''}`}>
          {Object.entries(SortOptionsMap).map(([value, label]) => (
            <li onClick={() => handleSelect(value as SortField)} key={value}>
              {label}
            </li>
          ))}
        </div>
      </div>

      <button
        className={styles.directionButton}
        onClick={() =>
          sortDirection === MovieSortDirection.ASC
            ? setSortDirection(MovieSortDirection.DESC)
            : setSortDirection(MovieSortDirection.ASC)
        }
        disabled={!!filters.query}
      >
        {sortDirection === MovieSortDirection.ASC ? (
          <FaArrowUp></FaArrowUp>
        ) : (
          <FaArrowDown></FaArrowDown>
        )}
      </button>
    </div>
  );
};
