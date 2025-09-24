import {AnimationNs, ISize} from './types';

export const Movement = {
  get: (size: ISize): Record<AnimationNs.Direction, number> => {
    const {width, height} = size;
    return {up: height, down: -height, left: width, right: -width};
  },

  getReflect: (size: ISize): Record<AnimationNs.Direction, number> => {
    const {width, height} = size;
    return {up: -height, down: height, left: -width, right: width};
  },
};

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

export const isObjectEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) => {
  const str1 = JSON.stringify(obj1);
  const str2 = JSON.stringify(obj2);
  return str1 === str2;
};
