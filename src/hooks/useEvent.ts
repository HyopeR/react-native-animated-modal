import {useCallback, useLayoutEffect, useRef} from 'react';

export const useEvent = <T extends (...args: any[]) => any>(fn: T): T => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Parameters<T>) => {
    return ref.current!(...args);
  }, []) as T;
};
