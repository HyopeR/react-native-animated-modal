import {ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {AnimationNs, BackdropNs, ISize, SwipeNs} from '../types';

export type ModalContextType = {
  swipe: SwipeNs.ConfigPrivate;
  animation: AnimationNs.ConfigPrivate;
  backdrop: BackdropNs.ConfigPrivate;
  size: SharedValue<ISize>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;
};

export type ModalProviderProps = {
  value: ModalContextType;
  children: ReactNode;
};
