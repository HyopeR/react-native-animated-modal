import {Dimensions} from 'react-native';
import {AnimationNs, BackdropNs, SwipeNs} from './types';

const {width, height} = Dimensions.get('window');

export const SIZE = {width, height};
export const DURATION = 500;

export const ANIMATION_FADE_CONFIG: AnimationNs.FadeAnimationConfig = {
  type: 'fade',
  duration: DURATION,
};

export const ANIMATION_SLIDE_CONFIG: AnimationNs.SlideAnimationConfig = {
  type: 'slide',
  duration: DURATION,
  direction: 'up',
};

export const ANIMATION_SCALE_CONFIG: AnimationNs.ScaleAnimationConfig = {
  type: 'scale',
  duration: DURATION,
};

export const SWIPE_LOCK_THRESHOLD = 8;
export const SWIPE_BASE_CONFIG = {
  distance: 120,
  velocity: 800,
};
export const SWIPE_ENABLED_CONFIG: SwipeNs.ConfigPrivate = {
  ...SWIPE_BASE_CONFIG,
  enabled: true,
  directions: ['up', 'down', 'left', 'right'],
};
export const SWIPE_DISABLED_CONFIG: SwipeNs.ConfigPrivate = {
  ...SWIPE_BASE_CONFIG,
  enabled: false,
  directions: [],
};

export const BACKDROP_BASE_CONFIG: BackdropNs.ConfigPrivate = {
  enabled: true,
  opacity: 0.6,
  backgroundColor: 'black',
};
