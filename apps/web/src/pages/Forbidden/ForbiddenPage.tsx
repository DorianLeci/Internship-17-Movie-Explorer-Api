import { FaTimes } from 'react-icons/fa';
import styles from './ForbiddenPage.module.scss';

const ForbiddenPage = () => {
  return (
    <div className={styles.container}>
      <FaTimes size={200} color="red" />
      <h1 className={styles.title}>403</h1>
      <p className={styles.subtitle}>Forbidden</p>
    </div>
  );
};

export default ForbiddenPage;
