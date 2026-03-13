import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface UseRevealOptions {
  shimmerOpacity?: number;
  shimmerDuration?: number;
}

const useShimmer = ({
  shimmerOpacity = 0.8,
  shimmerDuration = 0.5,
}: UseRevealOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: shimmerOpacity,
        duration: shimmerDuration,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, [shimmerOpacity, shimmerDuration]);

  return ref;
};

export default useShimmer;
