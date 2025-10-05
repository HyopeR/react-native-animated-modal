import {useCallback, useLayoutEffect, useRef} from 'react';

/**
 * @internal
 * Returns a stable callback reference for inline functions.
 *
 * Prevents unnecessary re-renders by caching the function reference,
 * while always calling the latest version of the user-provided callback.
 */
export const useEvent = <T extends (...args: any[]) => any>(fn: T): T => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Parameters<T>) => {
    return ref.current!(...args);
  }, []) as T;
};
