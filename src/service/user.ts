import request from '@/utils/request';

// 登陆
export const login = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  });
};
