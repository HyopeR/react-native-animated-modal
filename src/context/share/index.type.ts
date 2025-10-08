import {ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {NativeGesture, PanGesture} from 'react-native-gesture-handler';
import {ISize} from '../../types';

export type ShareContextState = {
  // animation management.
  size: SharedValue<ISize>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;

  // children management.
  scrolling: SharedValue<number>;
  native: NativeGesture;
  pan: PanGesture;
};

export type ShareProviderProps = {
  value: ShareContextState;
  children: ReactNode;
};
