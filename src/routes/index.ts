import { IRouterConfig } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import Workplace from '@/pages/Workplace';
import FeedbackNotFound from '@/pages/FeedbackNotFound';
import Provider from '@/components/Provider';

// 业务路由
import userRoutes from './routes.user';

const routerConfig: IRouterConfig[] = [
  ...userRoutes,
  {
    path: '/',
    component: Provider(BasicLayout),
    children: [
      {
        path: '/dashboard/workplace',
        component: Workplace,
      },
      {
        path: '/',
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
