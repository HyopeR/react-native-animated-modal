import {Dimensions} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {AnimationNs, BackdropNs, SwipeNs} from './types';

const {width, height} = Dimensions.get('window');

export const SIZE = {width, height};
export const DURATION = 350;
export const EASING = {
  fade: Easing.out(Easing.cubic),
  slide: Easing.inOut(Easing.ease),
  scale: Easing.inOut(Easing.ease),
};

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
export const SWIPE_ENABLED_CONFIG: SwipeNs.ConfigStrict = {
  ...SWIPE_BASE_CONFIG,
  enabled: true,
  directions: ['up', 'down', 'left', 'right'],
  closable: true,
};
export const SWIPE_DISABLED_CONFIG: SwipeNs.ConfigStrict = {
  ...SWIPE_BASE_CONFIG,
  enabled: false,
  directions: [],
  closable: false,
};

export const BACKDROP_BASE_CONFIG: BackdropNs.ConfigStrict = {
  enabled: true,
  opacity: 0.6,
  backgroundColor: 'black',
};
