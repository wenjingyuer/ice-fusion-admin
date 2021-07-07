import React from 'react';
import { IRouterConfig } from 'ice';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Provider from '@/components/Provider';

// 懒加载路由
const Register = React.lazy(() => import('@/pages/Register'));

// 业务路由

const routerConfig: IRouterConfig[] = [
  {
    path: '/user',
    component: Provider(UserLayout),
    children: [
      {
        path: '/login',
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
