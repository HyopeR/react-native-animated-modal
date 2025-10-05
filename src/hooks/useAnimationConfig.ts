import {useRef} from 'react';
import {getSafeProps, isObjectEqual} from '../utils';
import {
  ANIMATION_FADE_CONFIG,
  ANIMATION_SLIDE_CONFIG,
  ANIMATION_SCALE_CONFIG,
} from '../constants';
import {AnimationNs} from '../types';

const DICT = {
  fade: ANIMATION_FADE_CONFIG,
  slide: ANIMATION_SLIDE_CONFIG,
  scale: ANIMATION_SCALE_CONFIG,
  default: ANIMATION_FADE_CONFIG,
};

/**
 * @internal
 * Returns a cached animation config.
 * Merges user config with defaults and prevents re-renders if unchanged.
 */
export const useAnimationConfig = (config?: AnimationNs.Config) => {
  const configRef = useRef<AnimationNs.ConfigPrivate | null>(null);
  const configSafe = config || ({} as AnimationNs.Config);
  const configDefault = DICT[configSafe.type] || DICT.default;
  const configNew = getSafeProps(configSafe, configDefault);

  if (configRef?.current && isObjectEqual(configNew, configRef.current)) {
    return configRef.current!;
  } else {
    configRef.current = configNew;
    return configNew;
  }
};
