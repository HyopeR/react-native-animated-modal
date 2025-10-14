import {ReactNode} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {ScrollHandlerProcessed} from 'react-native-reanimated';
import {ScrollableEvent} from './hooks/index.type';

export {ScrollableEvent};

export type ScrollableOrientation = 'vertical' | 'horizontal';

/**
 * Props values to be passed to the child component of the Scrollable component.
 */
export type ScrollableChildrenOptions = {
  /**
   * If true, renders items next to each other horizontally instead of stacked vertically.
   * @default false
   */
  horizontal: boolean;
  /**
   * Reverses the direction of scroll. Uses scale transforms of -1.
   * @default false
   */
  inverted: boolean;
  /**
   * Controls how the component responds to pointer actions.
   * @default 'auto'
   */
  pointerEvents: 'box-none' | 'none' | 'box-only' | 'auto';
  /**
   * Limits how often scroll events will be fired while scrolling, specified as a time interval in ms.
   * @default 16
   */
  scrollEventThrottle: number;
  /**
   * Controls the stretching state when the scroll reaches the end.
   * @default false
   */
  bounces: boolean;
  /**
   * Controls the stretching state when the vertical scroll reaches the end.
   * @default false
   */
  alwaysBounceVertical: boolean;
  /**
   * Controls the stretching state when the horizontal scroll reaches the end.
   * @default false
   */
  alwaysBounceHorizontal: boolean;
  /**
   * Callback that is triggered when the child component is rendered.
   */
  onLayout: (e: LayoutChangeEvent) => void;
  /**
   * Callback that is triggered when the content area of the child component changes.
   */
  onContentSizeChange: (width: number, height: number) => void;
  /**
   * Callback that listens for the scroll events of the child component on the UI thread.
   */
  onScroll: ScrollHandlerProcessed;
};

/**
 * Props for the Scrollable component.
 * This is the type intended for end-user usage.
 */
export type ScrollableProps = {
  /**
   * Callback fired when the scrollable is ready.
   */
  orientation?: ScrollableOrientation;
  /**
   * Reverses the direction of scroll. Uses scale transforms of -1.
   */
  inverted?: boolean;
  /**
   * Callback that is triggered when the scrollable child component is scrolled.
   */
  onScroll?: (e: ScrollableEvent) => void;
  /**
   * Callback that is triggered when the scrollable child component begins scrolling.
   */
  onBeginDrag?: (e: ScrollableEvent) => void;
  /**
   * Callback that is triggered when the scrollable child component finishes scrolling.
   */
  onEndDrag?: (e: ScrollableEvent) => void;
  /**
   * Callback that is triggered when the scrollable child component begins scrolling momentum.
   */
  onMomentumBegin?: (e: ScrollableEvent) => void;
  /**
   * Callback that is triggered when the scrollable child component finishes scrolling momentum.
   */
  onMomentumEnd?: (e: ScrollableEvent) => void;
  /**
   * Scrollable function children.
   */
  children?: (options: ScrollableChildrenOptions) => ReactNode;
};

/**
 * Props that always have initial values even if the user leaves them empty.
 */
export type ScrollableRequiredProps = Required<
  Pick<ScrollableProps, 'orientation' | 'inverted' | 'children'>
>;

/**
 * Props that can be optionally provided by the user and are later filled with default values if missing.
 */
export type ScrollablePartialProps = Pick<
  ScrollableProps,
  'onScroll' | 'onBeginDrag' | 'onEndDrag' | 'onMomentumBegin' | 'onMomentumEnd'
>;

/** @internal */
export type ScrollableStrictProps = ScrollableRequiredProps &
  ScrollablePartialProps;
