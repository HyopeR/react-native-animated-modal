import React from 'react';
import {ConfigContextState, ConfigProviderProps} from './index.type';

const ConfigContext = React.createContext<ConfigContextState | null>(null);

export const ConfigProvider = ({value, children}: ConfigProviderProps) => {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const ctx = React.useContext(ConfigContext);
  if (!ctx) {
    throw new Error('useConfigContext must be inside ConfigProvider.');
  }
  return ctx;
};
