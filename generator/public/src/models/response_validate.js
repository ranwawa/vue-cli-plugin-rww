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
  console.log(res);
}
/**
 * 验证HTTP层错误
 * @param data
 */
function validateHTTP(data) {
  console.log(data);
}
/**
 * 验证服务端错误
 * @param statusCode {number} http响应状态码
 * @param data {object} http响应数据
 */
function validateServer(statusCode, data) {
  console.log(statusCode, data);
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

