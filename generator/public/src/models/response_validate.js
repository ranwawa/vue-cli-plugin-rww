/**
 * @author 冉娃娃
 * @since 2019/12/20
 * @desc 响应模型验证
 * @remark
 */
import _pick from 'lodash.pick';

const { toString } = Object.prototype;
const DEFAULTS = {
  String: '',
  Number: NaN,
  Boolean: null,
  Object: {},
  Array: [],
};
const HTTP_ERRORS = {
  400: '服务器验证失败,请稍后再试',
  403: '禁止该请求方法,请稍后再试',
  404: '未找到指定接口,请稍后再试',
  500: '服务器内部异常,请稍后再试',
  502: '服务器正在维护,请稍后再试',
};
/**
 * 获取对象的类型
 * @param value {object}
 * @returns {RegExpMatchArray | Promise<Response | undefined>}
 */
function getType(value) {
  const str = toString.call(value);
  return str.match(/^(?!\s)[a-zA-Z]+(?!])$/);
}
/**
 * 验证网络层错误
 */
function validateNetWork(res) {
  let errMsg = err.message || err.errorMsg || '';
  let result = '未知异常,请稍后再试';
  if (errMsg.includes('request:fail')) {
    // todo 这里要加上网络状态判断
    result = '连接失败,请打开wifi或数据连接';
  } else if (errMsg.includes('abort')) {
    result = true;
  }
  return result;
}
/**
 * 验证HTTP层错误
 * @param statusCode
 * @param err
 */
function validateHTTP(statusCode, err) {
  return HTTP_ERRORS[statusCode] || `未知异常${statusCode},请稍后再试`;
}
/**
 * 验证服务端错误
 * @param code
 * @param data {object} http响应数据
 */
function validateServer(code, data) {
  // 这里只要排除登陆失败的情况,统一轻提示处理就行了
  return data.message;
}
/**
 * 验证正常返回的情况
 * @param model {object} 响应模型
 * @param data {data} 返回的数据
 */
function validateOk(model, data) {
  // 返回值类型验证
  // 清洗数据
  // 赋默认值值
  if (model.type.name !== getType(data)) {
    return '返回的数据格式有误';
  }
  const cleanedData = _pick(
    data,
    Object
      .keys(model)
      .join(','),
  );
  Object
    .entries(cleanedData)
    .forEach(([key, value]) => {
      if (value === undefined || value === null) {
        const t = model.item[key].name;
        cleanedData[key] = DEFAULTS[t];
      }
    });
}
export {
  validateOk,
  validateHTTP,
  validateServer,
};

