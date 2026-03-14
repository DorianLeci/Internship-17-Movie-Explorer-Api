import AnimatedSkeleton from '@components/AnimatedSkeleton';
import styles from './MovieDetailsSkeleton.module.scss';

const MovieDetailsSkeleton = () => {
  return (
    <>
      <section className={styles.action}>
        <AnimatedSkeleton className={styles.backButton} />
        <AnimatedSkeleton className={styles.toggleFavoriteButton} />
        <AnimatedSkeleton width={160} height={40} />
      </section>

      <div className={styles.info}>
        <AnimatedSkeleton className={styles.title} />
      </div>
      <AnimatedSkeleton className={styles.card} />
      <AnimatedSkeleton className={styles.card} />
      <AnimatedSkeleton className={styles.card} />
    </>
  );
};

export default MovieDetailsSkeleton;
