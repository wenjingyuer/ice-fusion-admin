import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createModelSelector from '@/utils/createModelSelector';
import { login, getInfo } from '@/service/user';

export interface IUserInfo {
  token?: string;
  userId?: string;
  userName?: string;
  roles?: string[];
  avatar?: URL;
  [key: string]: any;
}
const INITIAL_STATE = {
  token: null,
  userId: null,
  userName: null,
  roles: [],
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
    setUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
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

export const thunks: {
  [thunkKey: string]: any;
} = {
  loginThunk: createAsyncThunk('user/login', async (params: any, thunkAPI) => {
    const res = await login(params);
    // await只能捕获resolve的内容
    if (!res) return;
    const { data } = res;
    // 登陆成功后根据token获取用户信息
    thunkAPI.dispatch(thunks.getUserInfoThunk(data));
    thunkAPI.dispatch(actions.setToken(data.token));
    // 在使用时，dispatch的then回调参数中可以获取res
    // 如果没有return 或者发生错误，则获取到res.payload = undefined
    return res;
  }),
  getUserInfoThunk: createAsyncThunk('user/getInfo', async (params: any, thunkAPI) => {
    const res = await getInfo(params);
    const { data } = res;
    thunkAPI.dispatch(actions.setUserInfo(data));
    return res;
  }),
};
