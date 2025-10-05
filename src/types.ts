/**
 * @internal
 * Animation direction type.
 */
export type IDirection = 'up' | 'down' | 'left' | 'right';

/**
 * @internal
 * Device orientation type.
 */
export type IOrientation = 'portrait' | 'landscape';

/**
 * @internal
 * Dimension type for general use.
 */
export type ISize = {
  width: number;
  height: number;
};

export namespace AnimationNs {
  /**
   * Animation configuration.
   */
  export type Config =
    | FadeAnimationConfig
    | SlideAnimationConfig
    | ScaleAnimationConfig;

  /** @internal */
  export type ConfigPrivate =
    | (FadeAnimationConfig & {duration: number})
    | (SlideAnimationConfig & {duration: number})
    | (ScaleAnimationConfig & {duration: number});

  /** @internal */
  export type Axis = 'x' | 'y';

  export type Direction = IDirection;

  /**
   * Direction with customizable start and end.
   */
  export type DirectionExtend = {
    start: IDirection;
    end: IDirection;
  };

  /** @internal */
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
  export type Direction = IDirection;

  /**
   * Swipe configuration.
   */
  export type Config = Partial<ConfigPrivate>;

  /** @internal */
  export type ConfigPrivate = {
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
  export type Config = Partial<ConfigPrivate>;

  /** @internal */
  export type ConfigPrivate = {
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
