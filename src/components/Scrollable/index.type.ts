import {ReactNode} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

/**
 * Props for the Scrollable component.
 * This is the type intended for end-user usage.
 */
export type ScrollableProps = {
  /**
   * Callback fired when the scrollable is ready.
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Callback fired when the scrollable is ready.
   */
  onReady?: (cb: (fn: NativeSyntheticEvent<NativeScrollEvent>) => void) => void;
  /**
   * Scrollable children.
   */
  children?: ReactNode;
};

/**
 * Props that always have initial values even if the user leaves them empty.
 */
export type ScrollableRequiredProps = Required<
  Pick<ScrollableProps, 'orientation' | 'onReady'>
>;

/**
 * Props that can be optionally provided by the user and are later filled with default values if missing.
 */
export type ScrollablePartialProps = Pick<ScrollableProps, 'children'>;

/** @internal */
export type ScrollableStrictProps = ScrollableRequiredProps &
  ScrollablePartialProps;
