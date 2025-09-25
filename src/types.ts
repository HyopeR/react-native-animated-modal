export type IDirection = 'up' | 'down' | 'left' | 'right';
export type IOrientation = 'portrait' | 'landscape';
export type ISize = {
  width: number;
  height: number;
};

export namespace AnimationNs {
  export type Animation = 'fade' | 'slide' | 'scale';

  export type Config =
    | FadeAnimationConfig
    | SlideAnimationConfig
    | ScaleAnimationConfig;

  export type ConfigPrivate =
    | (FadeAnimationConfig & {duration: number})
    | (SlideAnimationConfig & {duration: number})
    | (ScaleAnimationConfig & {duration: number});

  export type Axis = 'x' | 'y';

  export type Direction = IDirection;
  export type DirectionExtend = {
    start: IDirection;
    end: IDirection;
  };

  export interface BaseAnimationConfig {
    duration?: number;
  }

  export interface FadeAnimationConfig extends BaseAnimationConfig {
    type: 'fade';
  }

  export interface SlideAnimationConfig extends BaseAnimationConfig {
    type: 'slide';
    direction: Direction | DirectionExtend;
  }

  export interface ScaleAnimationConfig extends BaseAnimationConfig {
    type: 'scale';
  }
}

export namespace SwipeNs {
  export type Direction = IDirection;

  export type ConfigPrivate = {
    enabled: boolean;
    directions: Direction[];
    distance: number;
    velocity: number;
  };

  export type Config = Partial<ConfigPrivate>;
}

export namespace BackdropNs {
  export type ConfigPrivate = {
    enabled: boolean;
    backgroundColor: string;
    opacity: number;
  };

  export type Config = Partial<ConfigPrivate>;
}
