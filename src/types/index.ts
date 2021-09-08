import { IRouterConfig } from 'ice';

export interface ICustomRouterConfig extends IRouterConfig {
  roles?: string[];
  title?: string;
  children?: ICustomRouterConfig[];
}

export interface IUserInfo {
  token?: string;
  userId?: string;
  userName?: string;
  roles?: string[];
  avatar?: string;
  mail?: string;
  [key: string]: any;
}
