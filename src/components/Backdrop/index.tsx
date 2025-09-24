import React from 'react';
import {BackdropSimple} from './BackdropSimple';
import {BackdropNone} from './BackdropNone';
import {getSafeProps} from '../../utils';
import {
  BackdropProps,
  BackdropPrivateProps,
  BackdropPrivateStrictProps,
  BackdropRequiredProps,
} from './index.type';

export type {BackdropProps, BackdropPrivateProps};

const BackdropDefaultProps: BackdropRequiredProps = {
  enabled: true,
  backgroundColor: 'black',
  opacity: 0.7,
};

export const Backdrop = (props: BackdropPrivateProps) => {
  const safeProps = getSafeProps(
    props,
    BackdropDefaultProps,
  ) as BackdropPrivateStrictProps;

  const {enabled} = safeProps;

  if (enabled) {
    return <BackdropSimple {...safeProps} />;
  } else {
    return <BackdropNone {...safeProps} />;
  }
};
