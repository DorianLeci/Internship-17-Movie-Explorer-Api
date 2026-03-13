import AnimatedSkeleton from '@components/AnimatedSkeleton';
import cardStyles from '../MovieCard/MovieCard.module.scss';

const PLACEHOLDER_NUM = 10;

const MoviesPageSkeleton = () => {
  const placeholders = Array.from({ length: PLACEHOLDER_NUM });

  return (
    <>
      {placeholders.map((_, index) => (
        <AnimatedSkeleton
          key={index}
          className={cardStyles.skeletonCard}
        ></AnimatedSkeleton>
      ))}
    </>
  );
};

export default MoviesPageSkeleton;
