/**
 * @internal
 * Dimension type for general use.
 */
export type Size = {
  width: number;
  height: number;
};

/**
 * @internal
 * Offset type for general use.
 */
export type Offset = {
  x: number;
  y: number;
};

/**
 * @internal
 * Modal component status.
 */
export type Status = 'idle' | 'entering' | 'exiting';

/**
 * @internal
 * Scrollable component scroll state.
 */
export type Scroll = 'top' | 'bottom' | 'left' | 'right' | 'middle' | 'none';

/**
 * @internal
 * Scrollable component orientation.
 */
export type ScrollOrientation = 'vertical' | 'horizontal' | 'none';

export namespace AnimationNs {
  /**
   * Animation configuration.
   */
  export type Config =
    | FadeAnimationConfig
    | SlideAnimationConfig
    | ScaleAnimationConfig;

  /**
   * Animation strict configuration.
   */
  export type ConfigStrict =
    | (FadeAnimationConfig & {duration: number})
    | (SlideAnimationConfig & {duration: number})
    | (ScaleAnimationConfig & {duration: number});

  /**
   * Animation motion axis.
   */
  export type Axis = 'x' | 'y';

  /**
   * Animation direction type.
   */
  export type Direction = 'up' | 'down' | 'left' | 'right';

  /**
   * Direction with customizable start and end.
   */
  export type DirectionExtend = {
    /**
     * The animation start direction.
     */
    start: Direction;
    /**
     * The animation end direction.
     */
    end: Direction;
  };

  /**
   * Type of animation.
   */
  export type Animation = 'fade' | 'slide' | 'scale';

  export interface BaseAnimationConfig {
    /**
     * Duration of the animation in milliseconds.
     * @default 350
     */
    duration?: number;
  }

  export interface FadeAnimationConfig extends BaseAnimationConfig {
    /**
     * Must be 'fade'.
     */
    type: 'fade';
  }

  export interface SlideAnimationConfig extends BaseAnimationConfig {
    /**
     * Must be 'slide'.
     */
    type: 'slide';
    /**
     * Direction of the slide animation.
     * @default 'up'
     */
    direction: Direction | DirectionExtend;
  }

  export interface ScaleAnimationConfig extends BaseAnimationConfig {
    /**
     * Must be 'scale'.
     */
    type: 'scale';
  }
}

export namespace SwipeNs {
  /**
   * Animation direction type.
   */
  export type Direction = 'up' | 'down' | 'left' | 'right';

  /**
   * Swipe configuration.
   */
  export type Config = Partial<ConfigStrict>;

  /**
   * Swipe strict configuration.
   */
  export type ConfigStrict = {
    /**
     * Whether swipe gestures are enabled.
     * @default false
     */
    enabled: boolean;
    /**
     * Allowed swipe directions.
     * @default []
     */
    directions: Direction[];
    /**
     * Distance threshold to trigger swipe.
     * @default 120
     */
    distance: number;
    /**
     * Velocity threshold to trigger swipe.
     * @default 800
     */
    velocity: number;
    /**
     * Whether swipe can close the modal.
     * @default false
     */
    closable: boolean;
  };
}

export namespace BackdropNs {
  /**
   * Backdrop configuration.
   */
  export type Config = Partial<ConfigStrict>;

  /**
   * Backdrop strict configuration.
   */
  export type ConfigStrict = {
    /**
     * Whether the backdrop is enabled.
     * @default true
     */
    enabled: boolean;
    /**
     * Background color of the backdrop.
     * @default 'black'
     */
    backgroundColor: string;
    /**
     * Opacity of the backdrop.
     * @default 0.6
     */
    opacity: number;
  };
}
