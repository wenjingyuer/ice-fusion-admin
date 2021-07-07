import React from 'react';
import { runApp, IAppConfig } from 'ice';
import routes from './routes';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
    routes,
    fallback: <div>loading...</div>,
    modifyRoutes: (allRoutes) => {
      return allRoutes;
    },
  },
};

runApp(appConfig);
