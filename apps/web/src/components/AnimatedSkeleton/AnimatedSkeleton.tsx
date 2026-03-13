import useShimmer from '@hooks/useShimmer';
import Skeleton from 'react-loading-skeleton';

interface AnimatedSkeletonProps {
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const AnimatedSkeleton = ({
  width,
  height,
  count,
  className,
}: AnimatedSkeletonProps) => {
  const ref = useShimmer({});

  return (
    <div ref={ref}>
      <Skeleton
        width={width}
        height={height}
        count={count}
        baseColor="white"
        className={className}
      />
    </div>
  );
};

export default AnimatedSkeleton;
