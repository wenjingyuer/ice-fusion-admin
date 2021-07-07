import {
  createStore,
  combineReducers,
  createSlice,
  Store,
  Slice,
  PayloadAction,
  AnyAction,
  Reducer,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import get from 'lodash/get';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';

export interface IAppConfigSate {
  lang?: string;
  [key: string]: any;
}

const reducers = {
  setState: (
    state: IAppConfigSate,
    action: PayloadAction<IAppConfigSate | ((state: IAppConfigSate) => IAppConfigSate)>,
  ) => {
    if (isFunction(action.payload)) {
      return {
        ...state,
        // @ts-ignore 这里我们支持payload是函数的情况
        ...action.payload(state),
      };
    } else {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
};

// appConfig 相关数据模型
const slice = createSlice<IAppConfigSate, typeof reducers, 'appConfig'>({
  name: 'appConfig',
  initialState: merge(
    {
      lang: 'zh_CN',
    },
    get(window, 'appConfig', {}),
  ),
  reducers,
});

// reducer map
const CONFIG: {
  [name: string]: Reducer<any, AnyAction>;
} = {
  [slice.name as string]: slice.reducer,
};

const globalReducer = combineReducers(CONFIG);

interface ExtendStore extends Store {
  injectReducer: (slice: Slice) => void;
}

// 创建顶级store
export const store = createStore(globalReducer) as ExtendStore;

// 创建注入 reducer 函数
// 此函数添加 async reducer，并创建一个新的组合 reducer
store.injectReducer = (injectSlice) => {
  CONFIG[injectSlice.name] = injectSlice.reducer;
  store.replaceReducer(combineReducers(CONFIG));
};

// 自动注入models目录下的所有slice到顶层
// https://webpack.js.org/guides/dependency-management/#requirecontext
// @ts-ignore context未在NodeRequire的定义上
const modelsFiles = require.context('./models', true, /\.ts$/);

// you do not need `import slice from './models/slice'`
// it will auto require all models from model file
const models = modelsFiles.keys().reduce((modules, modulePath) => {
  // set './app.ts' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modelsFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

Object.values(models).map((model: Slice) => store.injectReducer(model));

export const { actions, reducer } = slice;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
