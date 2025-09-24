import {useRef} from 'react';
import {getSafeProps, isObjectEqual} from '../utils';
import {SWIPE_ENABLED_CONFIG, SWIPE_DISABLED_CONFIG} from '../constants';
import {SwipeNs} from '../types';

export const useSwipeConfig = (config?: SwipeNs.Config) => {
  const configRef = useRef<SwipeNs.ConfigPrivate | null>(null);
  const configSafe = config || ({} as SwipeNs.Config);
  const configDefault = configSafe?.enabled
    ? SWIPE_ENABLED_CONFIG
    : SWIPE_DISABLED_CONFIG;
  const configNew = getSafeProps(configSafe, configDefault);

  if (configRef?.current && isObjectEqual(configSafe, configRef.current)) {
    return configRef.current!;
  } else {
    configRef.current = configNew;
    return configNew;
  }
};
