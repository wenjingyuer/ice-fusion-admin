import { Message } from '@alifd/next';
import numeral from 'numeral';

/** 是否是本地访问 */
export const isLocal = () => location.hostname === '127.0.0.1' || location.hostname === 'localhost';

/** 获取url上的参数 */
export const getUrlParam = (name: string): any => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = decodeURIComponent(window.location.search.substr(1)).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/** 获取url上所有的参数 */
export const getUrlParams = () => {
  const paramsStr = decodeURIComponent(window.location.search.substr(1));
  const params = {};
  try {
    paramsStr.split('&').forEach((item) => {
      const paramArr = item.split('=');
      params[paramArr[0]] = paramArr[1];
    });
  } catch (err) {
    Message.notice('地址不合法');
  }
  return params;
};

/** 获取cookie */
export const getCookie = (cookieName) => {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split('; ');
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (cookieName === arr[0]) {
      return arr[1];
    }
  }
  return '';
};

/** decodeHtml */
export const decodeHtml = (html: string): string | null => {
  const oDiv = document.createElement('div');
  oDiv.innerHTML = html;
  const { textContent } = oDiv;
  return textContent;
};

export const isArray = (o: any) => {
  return Object.prototype.toString.call(o) === '[object Array]';
};

export const isObject = (o: any) => {
  return Object.prototype.toString.call(o) === '[object Object]';
};
export const hasValue = (value) => value !== '' && value !== undefined && value !== null;

export const getHasDataParmasForObject = (params) => {
  const data = {};
  for (const key in params) {
    const item = params[key];
    if (hasValue(item)) {
      data[key] = item;
    }
  }
  return data;
};

export const clearNoDataParams = (params) => {
  const data = {};
  for (const key in params) {
    const item = params[key];
    if (hasValue(item)) {
      if (isArray(item) && item.length) {
        data[key] = item;
      } else if (isObject(item) && Object.keys(item).length) {
        const objectData = getHasDataParmasForObject(item);
        Object.keys(objectData).length && (data[key] = objectData);
      } else {
        data[key] = item;
      }
    }
  }
  return data;
};

// 按数量级修改单位为万、亿
// 1234567 => 123万
export const numberFormatter = (val, decimalPlaces = 1, unitSeparation = false) => {
  if (typeof val !== 'number' || typeof decimalPlaces !== 'number') {
    throw Error('请输入正确的数据格式');
  }

  let fomatNum = 0;
  let unit = '';

  if (val >= 100000000) {
    fomatNum = val / 100000000;
    unit = '亿';
  } else if (val >= 10000) {
    fomatNum = val / 10000;
    unit = '万';
  } else if (val < 10000) {
    fomatNum = val;
    unit = '';
  }
  const denominator = Math.pow(10, decimalPlaces);
  if (unitSeparation) {
    // 数字与单位分离
    return {
      // @ts-ignore
      num: parseInt(fomatNum * denominator) / denominator,
      unit,
    };
  }
  // @ts-ignore
  return parseInt(fomatNum * denominator) / denominator + unit;
};

// 数据分割，千分位
// 1234567 => 1,234,567
export function separateDigitsWithSemicolon(val) {
  if (typeof val !== 'number') {
    console.error('请输入正确的数据格式');
    return val;
  }

  let res: any = val;
  try {
    const number = Number(val);
    const splitNum = val.toString().split('.');
    if (typeof number === 'number') {
      splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      res = splitNum.join('.');
    }
  } catch (error) {
    console.warn(error);
  }
  return res;
}

// 分 => 元，并千分位
// 1234567 => 12,345.67
export function cent2yuenWithSemicolon(val) {
  const cent = Number(val);

  if (!isNaN(cent)) {
    return numeral(cent).divide(100).format('0,0.00');
  }

  return val;
}
// 分 => 元，并千分位 + 单位
// 1234567 => 12,345.67元
export function cent2yuenWithSemicolonWithUnitYuen(val, prefix = false) {
  const cent = Number(val);

  if (!isNaN(cent)) {
    const n = numeral(cent).divide(100).format('0,0.00');
    return prefix === true ? `¥${n}` : `${n}元`;
  }

  return val;
}

// 分 => 按数量级修改单位为万、亿
// 1234567 => 1万
export function centNumberFormatter(val) {
  const cent = Number(val);
  return !isNaN(cent) ? numberFormatter(numeral(cent).divide(100).value()) : val;
}
// 分 => 按数量级修改单位为万、亿 + 单位
// 1234567 => 1万元
// '1234567' => 1万元
// prefix: true 则 1234567 => ¥1万
export function centNumberFormatterWithUnitYuen(val, prefix = false) {
  const cent = Number(val);

  if (!isNaN(cent)) {
    const n = numberFormatter(numeral(cent).divide(100).value());
    return prefix === true ? `¥${n}` : `${n}元`;
  }

  return val;
}

export const getMapFromArray = (data = [], { valueField = 'value', labelField = 'label' } = {}) => {
  const newData = data.reduce((res, item) => {
    res[item[valueField]] = item[labelField];
    return res;
  }, {});
  return newData;
};

export const scrollToAnchor = (anchorName, opt?: any) => {
  if (anchorName) {
    // 找到锚点
    const anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView(...opt);
    }
  }
};

export const on = (function () {
  if (typeof document.addEventListener === 'function') {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent(`on${event}`, handler);
      }
    };
  }
})();
