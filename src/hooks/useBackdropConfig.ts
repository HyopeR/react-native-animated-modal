import {useRef} from 'react';
import {getSafeProps, isObjectEqual} from '../utils';
import {BACKDROP_BASE_CONFIG} from '../constants';
import {BackdropNs} from '../types';

export const useBackdropConfig = (config?: BackdropNs.Config) => {
  const configRef = useRef<BackdropNs.ConfigPrivate | null>(null);
  const configSafe = config || ({} as BackdropNs.Config);
  const configDefault = BACKDROP_BASE_CONFIG;
  const configNew = getSafeProps(configSafe, configDefault);

  if (configRef?.current && isObjectEqual(configSafe, configRef.current)) {
    return configRef.current!;
  } else {
    configRef.current = configNew;
    return configNew;
  }
};
