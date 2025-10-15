import {ReactNode} from 'react';
import {AnimationNs, BackdropNs, SwipeNs} from '../../types';

export type ConfigContextState = {
  swipe: SwipeNs.ConfigStrict;
  animation: AnimationNs.ConfigStrict;
  backdrop: BackdropNs.ConfigStrict;
};

export type ConfigProviderProps = {
  value: ConfigContextState;
  children: ReactNode;
};
