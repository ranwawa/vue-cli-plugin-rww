/** @format */

export const HTTP_METHOD = {
  POST: 'POST',
  GET: 'GET',
};
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TIMEOUT: 408,
  TOO_MANY: 429,
  TOO_LARGE: 341,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};
export const TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  METHOD: 'method',
  REGEXP: 'regexp',
  INTEGER: 'integer',
  FLOAT: 'float',
  ARRAY: 'array',
  OBJECT: 'object',
  ENUM: 'enum',
  DATE: 'date',
  URL: 'url',
  HEX: 'hex',
  EMAIL: 'email',
  ANY: 'any',
};
export const TYPE_DEFAULT = {
  STRING: '',
  NUMBER: NaN,
  BOOLEAN: false,
  OBJECT: {},
  ARRAY: [],
  FUNCTION: () => {},
};
// 异常捕获
export const ERROR_NATIVE = {
  USER: {
    errMsg: '操作异常',
    errorId: 3001,
    isLog: true,
    isAlert: false,
  },
  INTERFACE: {
    errorId: 3000,
    isLog: true,
    isAlert: true,
    errMsg: '系统异常请稍后再试',
  },
};
export const ERROR_HTTP = {
  REQUEST_FAIL: {
    errorId: 1001,
    isLog: true,
    isAlert: true,
    errMsg: '网络忙,请稍后再试',
  },
  REQUEST_ABORT: {
    errorId: 1002,
    isLog: false,
    isAlert: false,
    errMsg: '取消请求',
  },
};
export const ERROR_UN_CATCH = {
  GLOBAL: {
    errorId: 4000,
    isLog: false,
    isAlert: true,
    errMsg: '计价过程中出现了错误，歇一下再试吧~',
  },
};
export const ERROR_CLIENT = {
  CODE: {
    errorId: 2001,
    isLog: true,
    isAlert: true,
    errMsg: '计价过程中出现了错误，歇一下再试吧~',
  },
};
// 模型验证
export function VALIDATOR_REQUIRED(message, type = 'string') {
  return {
    type,
    message,
    required: true,
  };
}
export const VALIDATOR_MOBILE = [
  VALIDATOR_REQUIRED('请填写手机号码'),
  {
    type: 'string',
    pattern: /^1[0-9]{10}$/,
    message: '手机号码格式有误',
  },
];
