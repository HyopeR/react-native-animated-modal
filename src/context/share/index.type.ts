import {ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {NativeGesture, PanGesture} from 'react-native-gesture-handler';
import {Offset, Size} from '../../types';

export type ShareContextState = {
  // Animation management values.
  size: SharedValue<Size>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;

  // Children management values.
  scrolling: SharedValue<number>;
  scrollingInitial: SharedValue<number>;
  scrollingOffset: SharedValue<Offset>;

  // Children management gestures.
  native: NativeGesture;
  pan: PanGesture;
};

export type ShareProviderProps = {
  value: ShareContextState;
  children: ReactNode;
};
