import { ICustomRouterConfig } from '@/types';

const routeMap = new Map<string, ICustomRouterConfig>();

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(route, roles) {
  if (route.roles) {
    return roles.some((role) => route.roles.includes(role));
  } else {
    return true;
  }
}

export function filterRoutes(routes: ICustomRouterConfig[], roles: string[] = []): ICustomRouterConfig[] {

  const res: ICustomRouterConfig[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route };
    if (hasPermission(tmpRoute, roles)) {
      if (tmpRoute.children) {
        tmpRoute.children = filterRoutes(tmpRoute.children, roles);
      }
      routeMap.set(tmpRoute.path as string, tmpRoute);
      res.push(tmpRoute);
    }
  });
  return res;
}

function getRouteInfo(path: string): ICustomRouterConfig | undefined {
  return routeMap.get(path);
}
export default getRouteInfo;
