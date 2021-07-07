import { createSlice } from '@reduxjs/toolkit';
import createModelSelector from '@/utils/createModelSelector';


export interface IUserInfo {
  token?: string;
  userId?: string;
  userName?: string;
  role?: string;
  avatar?: URL;
  [key: string]: any;
}
const INITIAL_STATE = {
  token: null,
  userId: null,
  userName: null,
  role: null,
  avatar: null,
};

// 以页面为数据模型分片粒度，即 page view model
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  // 通过 dispatch(actions.setToken(payloadValue))调用
  // 文档参考 https://redux-toolkit.js.org/api/createSlice
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});
export default userSlice;

/**
 * hook
 * 可在模块中通过useModelSelector使用当前模型中的数据
 * useModelSelector('token') 即获取model中的state的token属性的值。
 */
export const useModelSelector = createModelSelector(userSlice);

export const { actions, reducer } = userSlice;
