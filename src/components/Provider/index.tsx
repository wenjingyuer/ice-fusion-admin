import React, { ReactNode, FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

const Provider: (WrappedComponent: FC<{ [k: string]: any }>) => FC<ReactNode> = (WrappedComponent) => {
  const storeInjectedComponent: FC<ReactNode> = ({ children }) => {
    return (
      <ReduxProvider store={store}>
        {WrappedComponent ? <WrappedComponent>{children}</WrappedComponent> : null}
      </ReduxProvider>
    );
  };

  return storeInjectedComponent;
};

export default Provider;
