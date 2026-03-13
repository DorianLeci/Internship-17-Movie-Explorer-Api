import SortField from 'enums /SortField';
import SortOrder from 'enums /SortOrder';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { SortOptionsMap } from '../../../../helpers/SortOptionsMap';
import { useMovies } from '../../../../hooks/useMovies';
import { useToggle } from '../../../../hooks/useToggle';
import styles from './MovieSort.module.scss';

export const MovieSort = () => {
  const { filter, setSortField, setSortOrder } = useMovies();
  const { open, setOpen, toggle } = useToggle();

  const handleSelect = (value: SortField) => {
    setSortField(value);
    setOpen(false);
  };

  const handleSortOrder = (value: SortOrder) => {
    setSortOrder(value === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    setOpen(false);
  };

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.selectOption}>
        <div className={styles.inputLike} onClick={() => toggle()}>
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
        onClick={() => handleSortOrder(filter.sortOrder)}
      >
        {filter.sortOrder === SortOrder.ASC ? (
          <FaArrowUp></FaArrowUp>
        ) : (
          <FaArrowDown></FaArrowDown>
        )}
      </button>
    </div>
  );
};
