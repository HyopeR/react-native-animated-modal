import React from 'react';
import {BackdropSimple} from './BackdropSimple';
import {BackdropNone} from './BackdropNone';
import {
  BackdropProps,
  BackdropPrivateProps,
  BackdropPrivateStrictProps,
} from './index.type';

export type {BackdropProps, BackdropPrivateProps};

export const Backdrop = (props: BackdropPrivateStrictProps) => {
  const {enabled} = props;

  if (enabled) {
    return <BackdropSimple {...props} />;
  } else {
    return <BackdropNone {...props} />;
  }
};
