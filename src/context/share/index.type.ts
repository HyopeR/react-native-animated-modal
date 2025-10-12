import {ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {NativeGesture, PanGesture} from 'react-native-gesture-handler';
import {Offset, Scroll, ScrollOrientation, Size, Status} from '../../types';

export type ShareContextState = {
  // Animation management values.
  status: SharedValue<Status>;
  size: SharedValue<Size>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;

  // Children management values.
  scroll: SharedValue<Scroll>;
  scrollInteraction: SharedValue<boolean>;
  scrollLock: SharedValue<boolean>;
  scrollOffset: SharedValue<Offset>;
  scrollOrientation: SharedValue<ScrollOrientation>;

  // Children management gestures.
  native: NativeGesture;
  pan: PanGesture;
};

export type ShareProviderProps = {
  value: ShareContextState;
  children: ReactNode;
};
