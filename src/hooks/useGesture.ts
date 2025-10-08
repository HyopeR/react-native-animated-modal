import {useCallback, useMemo} from 'react';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {SWIPE_LOCK_THRESHOLD} from '../constants';
import {AnimationNs, Offset, Size, SwipeNs} from '../types';

export type UseGestureEvents = {
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
};

export type UseGestureProps = {
  swipe: SwipeNs.ConfigStrict;
  animation: AnimationNs.ConfigStrict;
  size: SharedValue<Size>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scrolling: SharedValue<number>;
  scrollingInitial: SharedValue<number>;
  scrollingOffset: SharedValue<Offset>;
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
  scrollingInitial,
  scrollingOffset,
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
    const gestureNative = Gesture.Native();
    const gesturePan = Gesture.Pan()
      .enabled(enabled)
      .simultaneousWithExternalGesture(gestureNative)
      .onStart(e => {
        ('worklet');
        if (scrolling.value) {
          scrollingOffset.value = {x: e.translationX, y: e.translationY};
          return;
        }

        direction.value = null;
        axis.value = null;
      })
      .onUpdate(e => {
        ('worklet');
        if (scrolling.value) {
          scrollingOffset.value = {x: e.translationX, y: e.translationY};
          return;
        }

        const translationX = e.translationX - scrollingOffset.value.x;
        const translationY = e.translationY - scrollingOffset.value.y;

        if (direction.value === null) {
          const absX = Math.abs(translationX);
          const absY = Math.abs(translationY);
          if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) {
            return;
          }

          if (absX > absY) {
            direction.value = translationX > 0 ? 'right' : 'left';
            axis.value = 'x';
          } else {
            direction.value = translationY > 0 ? 'down' : 'up';
            axis.value = 'y';
          }

          if (!swipe.directions.includes(direction.value)) {
            direction.value = null;
            axis.value = null;
          }
        }

        if (direction.value === 'up') {
          translateX.value = 0;
          translateY.value = Math.min(0, translationY);
        } else if (direction.value === 'down') {
          translateX.value = 0;
          translateY.value = Math.max(0, translationY);
        } else if (direction.value === 'left') {
          translateX.value = Math.min(0, translationX);
          translateY.value = 0;
        } else if (direction.value === 'right') {
          translateX.value = Math.max(0, translationX);
          translateY.value = 0;
        }
      })
      .onEnd(e => {
        ('worklet');
        if (scrolling.value) {
          scrollingOffset.value = {x: e.translationX, y: e.translationY};
          return;
        }

        const {velocityX, velocityY} = e;
        const translationX = e.translationX - scrollingOffset.value.x;
        const translationY = e.translationY - scrollingOffset.value.y;

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
        scrolling.value = scrollingInitial.value;
        scrollingOffset.value = {x: 0, y: 0};
      });

    return {native: gestureNative, pan: gesturePan};
  }, [
    axis,
    cb,
    config,
    direction,
    enabled,
    scrolling,
    scrollingInitial,
    scrollingOffset,
    size,
    swipe.closable,
    swipe.directions,
    swipe.distance,
    swipe.velocity,
    translateX,
    translateY,
  ]);
};
