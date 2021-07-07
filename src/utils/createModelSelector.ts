import { useSelector } from 'react-redux';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';

export default (slice) => {
  return (fn: ((store) => any) | string) => {
    return useSelector((store) => {
      if (isString(fn)) {
        return get(store[slice.name], fn);
      }
      if (isFunction(fn)) {
        // @ts-ignore
        return fn(store[slice.name]);
      }
    });
  };
};
