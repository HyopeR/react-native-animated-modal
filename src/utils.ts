import {AnimationNs, Size} from './types';

export const SlideMovement = {
  /**
   * @internal
   * Offset values for enter slide animations.
   */
  get: (size: Size): Record<AnimationNs.Direction, number> => {
    const {width, height} = size;
    return {up: height, down: -height, left: width, right: -width};
  },

  /**
   * @internal
   * Offset values for exit slide animations (reverse of get).
   */
  getReflect: (size: Size): Record<AnimationNs.Direction, number> => {
    const {width, height} = size;
    return {up: -height, down: height, left: -width, right: width};
  },
};

/**
 * @internal
 * Merge user props with defaults.
 * Keeps provided values, fills missing with default ones.
 */
export const getSafeProps = <Input extends object>(
  props: Input,
  propsDefault: Partial<Input>,
) => {
  const result = {...props};

  for (const key in propsDefault) {
    const value = result[key];
    if (value == null) {
      (result as any)[key] = propsDefault[key];
    }
  }

  return result as any;
};

/**
 * @internal
 * Shallow equality check using JSON stringify.
 * Used to compare props/objects for memoization.
 */
export const isObjectEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) => {
  const str1 = JSON.stringify(obj1);
  const str2 = JSON.stringify(obj2);
  return str1 === str2;
};
