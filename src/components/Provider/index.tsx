import React, { ReactNode, FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

const Provider: (PageComponent: React.ComponentType<any>) => (props: object) => JSX.Element = (WrappedComponent) => {
  const storeInjectedComponent: (props: React.PropsWithChildren<any>) => JSX.Element = ({ children }) => {
    return (
      <>
        <ReduxProvider store={store}>
          {WrappedComponent ? <WrappedComponent>{children}</WrappedComponent> : null}
        </ReduxProvider>
      </>
    );
  };

  return storeInjectedComponent;
};

export default Provider;
