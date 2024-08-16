import React, { PropsWithChildren, createContext } from "react";
import { SizeType } from ".";

interface ConfigProviderType {
  space?: {
    size?: SizeType;
  };
}

interface ConfigProviderProps extends PropsWithChildren<ConfigProviderType> {}

export const ConfigContext = createContext<ConfigProviderType>({});

export function ConfigProvider(props: ConfigProviderProps) {
  const { space, children } = props;

  return (
    <ConfigContext.Provider value={{ space }}>
      {children}
    </ConfigContext.Provider>
  );
}
