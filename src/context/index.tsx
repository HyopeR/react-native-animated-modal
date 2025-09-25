import React from 'react';
import {ModalContextType, ModalProviderProps} from './index.type';

const ModalContext = React.createContext<ModalContextType | null>(null);

export const ModalProvider = ({value, children}: ModalProviderProps) => {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = React.useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModalContext must be used inside ModalProvider');
  }
  return ctx;
};
