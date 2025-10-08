import {useCallback, useMemo} from 'react';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {SWIPE_LOCK_THRESHOLD} from '../constants';
import {AnimationNs, ISize, SwipeNs} from '../types';

export type UseGestureEvents = {
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
};

export type UseGestureProps = {
  swipe: SwipeNs.ConfigStrict;
  animation: AnimationNs.ConfigStrict;
  size: SharedValue<ISize>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scrolling: SharedValue<number>;
  events?: Partial<UseGestureEvents>;
};

/**
 * @internal
 * Hook to handle swipe gestures for dismissing or moving the view.
 *
 * Updates translation shared values (X/Y) based on gesture input.
 * Determines direction (up, down, left, right) with lock threshold.
 * Applies user-defined swipe config (distance, velocity, closable).
 * Calls lifecycle events: `onSwipeComplete` or `onSwipeCancel`.
 */
export const useGesture = ({
  size,
  swipe,
  animation,
  translateX,
  translateY,
  scrolling,
  events,
}: UseGestureProps) => {
  const enabled = useMemo(
    () => swipe.enabled && swipe.directions.length >= 1,
    [swipe.directions.length, swipe.enabled],
  );

  const config = useMemo(
    () => ({duration: animation.duration}),
    [animation.duration],
  );

  const direction = useSharedValue<AnimationNs.Direction | null>(null);
  const axis = useSharedValue<AnimationNs.Axis | null>(null);

  const handler = useCallback(
    (type: 'complete' | 'cancel') => {
      if (type === 'complete') events?.onSwipeComplete?.();
      else events?.onSwipeCancel?.();
      direction.value = null;
      axis.value = null;
    },
    [axis, direction, events],
  );

  const cb = useCallback(
    (
      finished: boolean | undefined,
      character: 'x' | 'y',
      type: 'complete' | 'cancel',
    ) => {
      'worklet';
      if (finished && axis.value === character) {
        runOnJS(handler)(type);
      }
    },
    [axis, handler],
  );

  return useMemo(() => {
    const gestureNative = Gesture.Native().enabled(enabled);
    const gesturePan = Gesture.Pan()
      .enabled(enabled)
      .simultaneousWithExternalGesture(gestureNative)
      .onStart(() => {
        'worklet';
        if (scrolling.value) return;

        direction.value = null;
        axis.value = null;
      })
      .onUpdate(event => {
        'worklet';
        if (scrolling.value) return;

        if (direction.value === null) {
          const absX = Math.abs(event.translationX);
          const absY = Math.abs(event.translationY);
          if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) {
            return;
          }

          if (absX > absY) {
            direction.value = event.translationX > 0 ? 'right' : 'left';
            axis.value = 'x';
          } else {
            direction.value = event.translationY > 0 ? 'down' : 'up';
            axis.value = 'y';
          }

          if (!swipe.directions.includes(direction.value)) {
            direction.value = null;
            axis.value = null;
          }
        }

        if (direction.value === 'up') {
          translateX.value = 0;
          translateY.value = Math.min(0, event.translationY);
        } else if (direction.value === 'down') {
          translateX.value = 0;
          translateY.value = Math.max(0, event.translationY);
        } else if (direction.value === 'left') {
          translateX.value = Math.min(0, event.translationX);
          translateY.value = 0;
        } else if (direction.value === 'right') {
          translateX.value = Math.max(0, event.translationX);
          translateY.value = 0;
        }
      })
      .onEnd(event => {
        'worklet';
        if (scrolling.value) return;

        const {translationX, velocityX, translationY, velocityY} = event;

        let dismiss = false;
        let toX = 0;
        let toY = 0;

        if (direction.value === 'up') {
          dismiss =
            translationY < -swipe.distance || velocityY < -swipe.velocity;
          toY = dismiss ? -size.value.height : 0;
        } else if (direction.value === 'down') {
          dismiss = translationY > swipe.distance || velocityY > swipe.velocity;
          toY = dismiss ? size.value.height : 0;
        } else if (direction.value === 'left') {
          dismiss =
            translationX < -swipe.distance || velocityX < -swipe.velocity;
          toX = dismiss ? -size.value.width : 0;
        } else if (direction.value === 'right') {
          dismiss = translationX > swipe.distance || velocityX > swipe.velocity;
          toX = dismiss ? size.value.width : 0;
        }

        if (dismiss && axis.value && swipe.closable) {
          translateX.value = withTiming(toX, config, f =>
            cb(f, 'x', 'complete'),
          );
          translateY.value = withTiming(toY, config, f =>
            cb(f, 'y', 'complete'),
          );
        } else {
          translateX.value = withTiming(0, config, f => cb(f, 'x', 'cancel'));
          translateY.value = withTiming(0, config, f => cb(f, 'y', 'cancel'));
        }
      })
      .onFinalize(() => {
        if (scrolling.value) return;
        scrolling.value = 1;
      });

    return {native: gestureNative, pan: gesturePan};
  }, [
    axis,
    cb,
    config,
    direction,
    enabled,
    scrolling,
    size,
    swipe.closable,
    swipe.directions,
    swipe.distance,
    swipe.velocity,
    translateX,
    translateY,
  ]);
};
