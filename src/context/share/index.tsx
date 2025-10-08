import React from 'react';
import {ShareContextState, ShareProviderProps} from './index.type';

const ShareContext = React.createContext<ShareContextState | null>(null);

export const ShareProvider = ({value, children}: ShareProviderProps) => {
  return (
    <ShareContext.Provider value={value}>{children}</ShareContext.Provider>
  );
};

export const useShareContext = () => {
  const ctx = React.useContext(ShareContext);
  if (!ctx) {
    throw new Error('useShareContext must be inside ShareProvider.');
  }
  return ctx;
};
