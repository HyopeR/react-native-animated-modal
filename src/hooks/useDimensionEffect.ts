import {DependencyList, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {ISize} from '../types';

export const useDimensionEffect = (
  callback: (size: ISize) => void,
  deps: DependencyList = [],
) => {
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      callback({width, height});
    });

    return () => sub.remove();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, callback]);
};
