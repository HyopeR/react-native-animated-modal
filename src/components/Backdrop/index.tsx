import React from 'react';
import {useConfigContext} from '../../context';
import {BackdropSimple} from './BackdropSimple';
import {BackdropNone} from './BackdropNone';
import {
  BackdropProps,
  BackdropPrivateProps,
  BackdropPrivateStrictProps,
} from './index.type';

export type {BackdropProps, BackdropPrivateProps};

export const Backdrop = (props: BackdropPrivateStrictProps) => {
  const {backdrop} = useConfigContext();

  if (backdrop.enabled) {
    return <BackdropSimple {...props} {...backdrop} />;
  } else {
    return <BackdropNone {...props} {...backdrop} />;
  }
};
