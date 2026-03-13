import { useEffect, useState } from 'react';

interface UseRevealOptions {
  isLoading: boolean;
  minVisibleTime?: number;
}

const useReveal = ({ isLoading, minVisibleTime = 500 }: UseRevealOptions) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    let timeout: number | undefined;

    if (isLoading) setVisible(true);
    else timeout = setTimeout(() => setVisible(false), minVisibleTime);
  }, [isLoading, minVisibleTime]);

  return visible;
};

export default useReveal;
