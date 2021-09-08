import React, { useEffect } from 'react';
import { useAuth, Redirect, useLocation } from 'ice';
import { getToken, removeToken } from '@/utils/auth'; // get token from cookie
import getRouteInfo from '@/utils/getRouteInfo';
import getPageTitle from '@/utils/getPageTitle';
import { useDispatch } from 'react-redux';
import { actions } from '@/models/user';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const AuthWrapper = (WrappedComponent) => {
  const Wrapped = (props) => {
    NProgress.start();

    // determine whether the user has logged in
    const hasToken = getToken();
    const location = useLocation();
    const routeInfo = getRouteInfo(location.pathname);
    const [userAuth] = useAuth();
    const dispatch = useDispatch();
    const { title } = routeInfo || {};
    const whiteList = ['/user/login', '/auth-redirect']; // no redirect whitelist

    // set page title
    document.title = getPageTitle(title);

    // 将 useInfo 挂载到redux
    useEffect(() => {
      dispatch(actions.setUserInfo((window as any).useInfo));
    }, []);

    if (hasToken) {
      if (location.pathname === '/user/login') {
        // if is logged in, redirect to the home page
        NProgress.done();
        return <Redirect to="/" />;
      } else {
        const hasRoles = Object.keys(userAuth).length > 0;
        // 没有设置好权限
        if (!hasRoles) {
          removeToken();
          window.location.reload();
        }
      }
    } else {
      // has no token
      if (whiteList.indexOf(location.pathname) !== -1) {
        NProgress.done();
        // in the free login whitelist, go directly
        return <WrappedComponent {...props} />;
      }
      NProgress.done();
      // other pages that do not have permission to access are redirected to the login page.
      return <Redirect to={`/user/login?redirect=${location.pathname}`} />;
    }

    NProgress.done();
    return <WrappedComponent {...props} />;
  };

  return Wrapped;
};

export default AuthWrapper;
