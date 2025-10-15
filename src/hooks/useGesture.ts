import {useCallback, useMemo} from 'react';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {SWIPE_LOCK_THRESHOLD} from '../constants';
import {
  AnimationNs,
  Offset,
  Scroll,
  ScrollOrientation,
  Size,
  Status,
  SwipeNs,
} from '../types';

export type UseGestureEvents = {
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
};

export type UseGestureProps = {
  animation: AnimationNs.ConfigStrict;
  swipe: SwipeNs.ConfigStrict;
  status: SharedValue<Status>;
  size: SharedValue<Size>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scroll: SharedValue<Scroll>;
  scrollInteraction: SharedValue<boolean>;
  scrollLock: SharedValue<boolean>;
  scrollOffset: SharedValue<Offset>;
  scrollOrientation: SharedValue<ScrollOrientation>;
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
  animation,
  swipe,
  status,
  size,
  translateX,
  translateY,
  scroll,
  scrollInteraction,
  scrollLock,
  scrollOffset,
  scrollOrientation,
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
  const directionLock = useSharedValue<AnimationNs.Direction | null>(null);
  const axis = useSharedValue<AnimationNs.Axis | null>(null);
  const axisLock = useSharedValue<AnimationNs.Axis | null>(null);

  const handler = useCallback(
    (type: 'complete' | 'cancel') => {
      if (type === 'complete') events?.onSwipeComplete?.();
      else events?.onSwipeCancel?.();

      setTimeout(() => {
        status.value = 'idle';

        direction.value = null;
        directionLock.value = null;
        axis.value = null;
        axisLock.value = null;

        scrollLock.value = false;
        scrollOffset.value = {x: 0, y: 0};
      }, 0);
    },
    [
      axis,
      axisLock,
      direction,
      directionLock,
      events,
      scrollLock,
      scrollOffset,
      status,
    ],
  );

  const cb = useCallback(
    (finished: boolean | undefined, type: 'complete' | 'cancel') => {
      'worklet';
      if (finished) {
        runOnJS(handler)(type);
      }
    },
    [handler],
  );

  return useMemo(() => {
    const gestureNative = Gesture.Native()
      .shouldCancelWhenOutside(false)
      .onTouchesDown(() => {
        'worklet';
        if (!scrollInteraction.value) scrollInteraction.value = true;
      })
      .onTouchesUp(() => {
        'worklet';
        if (scrollInteraction.value) scrollInteraction.value = false;
      });

    const gesturePan = Gesture.Pan()
      .enabled(enabled)
      .simultaneousWithExternalGesture(gestureNative)
      .shouldCancelWhenOutside(false)
      .onStart(() => {
        'worklet';
        if (status.value !== 'idle') return;

        direction.value = null;
        directionLock.value = null;
        axis.value = null;
        axisLock.value = null;

        scrollLock.value = false;
        scrollOffset.value = {x: 0, y: 0};
      })
      .onUpdate(e => {
        'worklet';
        if (status.value !== 'idle') return;

        const translationX = e.translationX - scrollOffset.value.x;
        const translationY = e.translationY - scrollOffset.value.y;

        const absX = Math.abs(translationX);
        const absY = Math.abs(translationY);
        if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) {
          return;
        }

        // The direction and axis of movement are determined.
        if (absX > absY) {
          direction.value = translationX > 0 ? 'right' : 'left';
          axis.value = 'x';
        } else {
          direction.value = translationY > 0 ? 'down' : 'up';
          axis.value = 'y';
        }

        // The axis is locked when movement begins.
        // It prevents simultaneous movement in the X and Y axes.
        if (!axisLock.value) {
          axisLock.value = axis.value;
        }

        // The direction of movement can be changed while in motion.
        // The direction of movement can only change along the axis from which it started.
        if (!directionLock.value || axisLock.value === axis.value) {
          directionLock.value = direction.value;
          // Scroll lock needs to be turned on when the direction changes.
          scrollLock.value = false;
        }

        // If there is a movement in directions not specified by the user,
        // the movement is not started.
        if (!swipe.directions.includes(directionLock.value)) {
          direction.value = null;
          directionLock.value = null;
          axis.value = null;
          axisLock.value = null;
          return;
        }

        // If there are any scrollable children and the scroll status is 'middle', their
        // movements on the same axis during this movement are written into the offset.
        if (
          scrollInteraction.value &&
          scrollOrientation.value !== 'none' &&
          scroll.value === 'middle'
        ) {
          if (
            (scrollOrientation.value === 'vertical' && axis.value === 'y') ||
            (scrollOrientation.value === 'horizontal' && axis.value === 'x')
          ) {
            scrollOffset.value = {x: e.translationX, y: e.translationY};
            return;
          }
        }

        // Pan.Gesture and Scrollable Children are what determine how the component will work.
        // If there are no scrollable children -> All true.
        // If there are scrollable children -> Determine by position in the list.
        const scrollable = {
          top:
            !scrollInteraction.value ||
            scrollOrientation.value !== 'vertical' ||
            (scrollOrientation.value === 'vertical' && scroll.value !== 'top'),
          bottom:
            !scrollInteraction.value ||
            scrollOrientation.value !== 'vertical' ||
            (scrollOrientation.value === 'vertical' &&
              scroll.value !== 'bottom'),
          left:
            !scrollInteraction.value ||
            scrollOrientation.value !== 'horizontal' ||
            (scrollOrientation.value === 'horizontal' &&
              scroll.value !== 'left'),
          right:
            !scrollInteraction.value ||
            scrollOrientation.value !== 'horizontal' ||
            (scrollOrientation.value === 'horizontal' &&
              scroll.value !== 'right'),
        };

        switch (direction.value) {
          case 'up':
            if (axisLock.value === 'y' && scrollable.top) {
              if (!scrollLock.value) scrollLock.value = true;
              translateX.value = 0;
              translateY.value = Math.min(0, translationY);
            }
            break;
          case 'down':
            if (axisLock.value === 'y' && scrollable.bottom) {
              if (!scrollLock.value) scrollLock.value = true;
              translateX.value = 0;
              translateY.value = Math.max(0, translationY);
            }
            break;
          case 'left':
            if (axisLock.value === 'x' && scrollable.left) {
              if (!scrollLock.value) scrollLock.value = true;
              translateX.value = Math.min(0, translationX);
              translateY.value = 0;
            }
            break;
          case 'right':
            if (axisLock.value === 'x' && scrollable.right) {
              if (!scrollLock.value) scrollLock.value = true;
              translateX.value = Math.max(0, translationX);
              translateY.value = 0;
            }
            break;
        }
      })
      .onEnd(e => {
        'worklet';
        if (status.value !== 'idle') return;
        if (!axisLock.value || !directionLock.value) return;

        const translationX = e.translationX - scrollOffset.value.x;
        const translationY = e.translationY - scrollOffset.value.y;

        if (
          (scrollOrientation.value === 'vertical' && axisLock.value === 'y') ||
          (scrollOrientation.value === 'horizontal' && axisLock.value === 'x')
        ) {
          const absX = Math.abs(translationX);
          const absY = Math.abs(translationY);
          if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) {
            return;
          }
        }

        let dismiss = false;
        let toX = 0;
        let toY = 0;

        if (directionLock.value === 'up') {
          dismiss = translationY < -swipe.distance;
          toY = dismiss ? -size.value.height : 0;
        } else if (directionLock.value === 'down') {
          dismiss = translationY > swipe.distance;
          toY = dismiss ? size.value.height : 0;
        } else if (directionLock.value === 'left') {
          dismiss = translationX < -swipe.distance;
          toX = dismiss ? -size.value.width : 0;
        } else if (directionLock.value === 'right') {
          dismiss = translationX > swipe.distance;
          toX = dismiss ? size.value.width : 0;
        }

        if (dismiss && swipe.closable) {
          // Modal closing change modal state.
          status.value = 'exiting';
          translateX.value = withTiming(toX, config, f => {
            if (axisLock.value === 'x') cb(f, 'complete');
          });
          translateY.value = withTiming(toY, config, f => {
            if (axisLock.value === 'y') cb(f, 'complete');
          });
        } else {
          translateX.value = withTiming(0, config, f => {
            if (axisLock.value === 'x') cb(f, 'cancel');
          });
          translateY.value = withTiming(0, config, f => {
            if (axisLock.value === 'y') cb(f, 'cancel');
          });
        }
      });

    return {
      native: gestureNative,
      pan: gesturePan,
    };
  }, [
    axis,
    axisLock,
    cb,
    config,
    direction,
    directionLock,
    enabled,
    scroll,
    scrollInteraction,
    scrollLock,
    scrollOffset,
    scrollOrientation,
    size,
    status,
    swipe.closable,
    swipe.directions,
    swipe.distance,
    translateX,
    translateY,
  ]);
};
