import React from 'react';
import { runApp, IAppConfig } from 'ice';
import routes from './routes';
import { filterRoutes } from '@/utils/getRouteInfo';
import { ICustomRouterConfig, IUserInfo } from '@/types';
import { getInfo } from '@/service/user';
import { getToken } from '@/utils/auth';

async function asyncRunApp() {
  const token = getToken();

  let useInfo: IUserInfo = {};
  if (token) {
    const res = await getInfo({ token });
    useInfo = res.data || {};
    // 挂载合并后的用户信息（采用后端控制返回index.html的情况下可能会存在后端动态挂载的用户信息）
    (window as any).useInfo = {
      ...(window as any).useInfo,
      ...useInfo,
    };
  }

  const { roles } = useInfo;

  const appConfig: IAppConfig = {
    app: {
      rootId: 'ice-container',
      getInitialData: async () => {
        return {
          auth: {
            admin: roles?.includes('admin') || false,
            editor: roles?.includes('editor') || false,
          },
        };
      },
    },
    router: {
      type: 'browser',
      routes,
      fallback: <div>loading...</div>,
      modifyRoutes: (allRoutes) => {
        return filterRoutes(allRoutes as unknown as ICustomRouterConfig[], roles);
      },
    },
  };
  runApp(appConfig);
}

asyncRunApp();
