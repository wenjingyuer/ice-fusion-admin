import { ICustomRouterConfig } from '@/types';
import BasicLayout from '@/layouts/BasicLayout';
import Workplace from '@/pages/Workplace';
import FeedbackNotFound from '@/pages/FeedbackNotFound';
import Provider from '@/components/Provider';
import AuthWrapper from '@/components/AuthWrapper';

// 业务路由
import userRoutes from './routes.user';

const routerConfig: ICustomRouterConfig[] = [
  ...userRoutes,
  {
    path: '/',
    component: BasicLayout,
    wrappers: [AuthWrapper, Provider],
    children: [
      {
        path: '/dashboard/workplace',
        exact: true,
        component: Workplace,
        roles: ['admin'],
        title: '工作台',
      },
      {
        path: '/',
        exact: true,
        redirect: '/dashboard/workplace',
      },
      {
        // 404 没有匹配到的路由
        component: FeedbackNotFound,
      },
    ],
  },
];

export default routerConfig;
