import React from 'react';
import { ICustomRouterConfig } from '@/types';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Provider from '@/components/Provider';
import AuthWrapper from '@/components/AuthWrapper';

// 懒加载路由
const Register = React.lazy(() => import('@/pages/Register'));

// 业务路由

const routerConfig: ICustomRouterConfig[] = [
  {
    path: '/user',
    component: UserLayout,
    wrappers: [Provider],
    children: [
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
];

export default routerConfig;
