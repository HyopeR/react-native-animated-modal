import React from 'react';
import {useModalContext} from '../../context';
import {BackdropSimple} from './BackdropSimple';
import {BackdropNone} from './BackdropNone';
import {
  BackdropProps,
  BackdropPrivateProps,
  BackdropPrivateStrictProps,
} from './index.type';

export type {BackdropProps, BackdropPrivateProps};

export const Backdrop = (props: BackdropPrivateStrictProps) => {
  const {backdrop} = useModalContext();

  if (backdrop.enabled) {
    return <BackdropSimple {...props} {...backdrop} />;
  } else {
    return <BackdropNone {...props} {...backdrop} />;
  }
};
