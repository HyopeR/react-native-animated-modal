import {useCallback, useMemo} from 'react';
import {
  runOnJS,
  SharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import {EASING} from '../constants';
import {Movement} from '../utils';
import {AnimationNs, ISize} from '../types';

export type UseAnimationEvents = {
  onInitStart: () => void;
  onInitEnd: () => void;
  onEnterStart: () => void;
  onEnterEnd: () => void;
  onExitStart: () => void;
  onExitEnd: () => void;
};

export type UseAnimationProps = {
  animation: AnimationNs.ConfigPrivate;
  size: SharedValue<ISize>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;
  events?: Partial<UseAnimationEvents>;
};

export const useAnimation = ({
  size,
  animation,
  translateX,
  translateY,
  scale,
  opacity,
  events,
}: UseAnimationProps) => {
  const config = useMemo<WithTimingConfig>(() => {
    return {
      duration: animation.duration,
      easing: EASING[animation.type],
    };
  }, [animation.duration, animation.type]);

  const handler = useCallback(
    (event: keyof UseAnimationEvents) => {
      events?.[event]?.();
    },
    [events],
  );

  const cb = useCallback(
    (finished: boolean | undefined, event: keyof UseAnimationEvents) => {
      'worklet';
      if (finished) {
        runOnJS(handler)(event);
      }
    },
    [handler],
  );

  const init = useCallback(() => {
    handler('onInitStart');
    switch (animation.type) {
      case 'fade':
        translateX.value = 0;
        translateY.value = 0;
        opacity.value = 0;
        scale.value = 1;
        break;

      case 'slide':
        const {direction} = animation;
        const movement = Movement.get(size.value);
        const dict: Record<AnimationNs.Direction, Function> = {
          up: () => {
            translateX.value = 0;
            translateY.value = movement.up;
          },
          down: () => {
            translateX.value = 0;
            translateY.value = movement.down;
          },
          left: () => {
            translateX.value = movement.left;
            translateY.value = 0;
          },
          right: () => {
            translateX.value = movement.right;
            translateY.value = 0;
          },
        };
        opacity.value = 1;
        scale.value = 1;
        if (typeof direction === 'string') dict[direction]();
        else dict[direction.start]();
        break;

      case 'scale':
        translateX.value = 0;
        translateY.value = 0;
        opacity.value = 1;
        scale.value = 0;
        break;
    }
    handler('onInitEnd');
  }, [animation, handler, opacity, scale, size, translateX, translateY]);

  const enter = useCallback(() => {
    handler('onEnterStart');
    switch (animation.type) {
      case 'fade':
        opacity.value = withTiming(1, config, f => cb(f, 'onEnterEnd'));
        break;

      case 'slide':
        const {direction} = animation;
        const dict: Record<AnimationNs.Direction, Function> = {
          up: () => {
            translateY.value = withTiming(0, config, f => cb(f, 'onEnterEnd'));
          },
          down: () => {
            translateY.value = withTiming(0, config, f => cb(f, 'onEnterEnd'));
          },
          left: () => {
            translateX.value = withTiming(0, config, f => cb(f, 'onEnterEnd'));
          },
          right: () => {
            translateX.value = withTiming(0, config, f => cb(f, 'onEnterEnd'));
          },
        };
        if (typeof direction === 'string') dict[direction]();
        else dict[direction.start]();
        break;

      case 'scale':
        scale.value = withTiming(1, config, f => cb(f, 'onEnterEnd'));
        break;
    }
  }, [animation, cb, config, handler, opacity, scale, translateX, translateY]);

  const exit = useCallback(() => {
    handler('onExitStart');
    switch (animation.type) {
      case 'fade':
        opacity.value = withTiming(0, config, f => cb(f, 'onExitEnd'));
        break;

      case 'slide':
        const {direction} = animation;

        const reflection = typeof direction !== 'string';
        const movement = reflection
          ? Movement.getReflect(size.value)
          : Movement.get(size.value);

        const dict: Record<AnimationNs.Direction, Function> = {
          up: () => {
            translateY.value = withTiming(movement.up, config, f =>
              cb(f, 'onExitEnd'),
            );
          },
          down: () => {
            translateY.value = withTiming(movement.down, config, f =>
              cb(f, 'onExitEnd'),
            );
          },
          left: () => {
            translateX.value = withTiming(movement.left, config, f =>
              cb(f, 'onExitEnd'),
            );
          },
          right: () => {
            translateX.value = withTiming(movement.right, config, f =>
              cb(f, 'onExitEnd'),
            );
          },
        };
        if (typeof direction === 'string') dict[direction]();
        else dict[direction.end]();
        break;

      case 'scale':
        scale.value = withTiming(0, config, f => cb(f, 'onExitEnd'));
        break;
    }
  }, [
    animation,
    cb,
    config,
    handler,
    opacity,
    scale,
    size,
    translateX,
    translateY,
  ]);

  return {init, enter, exit};
};
