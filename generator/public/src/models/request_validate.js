/**
 * @author 冉娃娃
 * @since 2019/12/20
 * @desc 请求模型验证
 * @remark
 */
function Result(status, message) {
  return {
    status,
    message,
  };
}
const validate = (function () {
  function min(value, key, length) {
    if (typeof value === 'number') {
      const status = value.length > length;
      return new Result(status, status ? '' : `${key}必须大于${length}`);
    }
    return new Result(false, `${key}必须是数值型才行哦`);
  }
  function max(value, key, length) {
    if (typeof value === 'number') {
      const status = value.length < length;
      return new Result(status, status ? '' : `${key}必须小于${length}`);
    }
    return new Result(false, `${key}必须是数值型才行哦`);
  }
  function required(value, key) {
    const status = !!value;
    return new Result(status, `${key}是必填的哦`);
  }
  function isCellPhone(value, key) {
    const status = /^1[3-9][0-9]{9}$/.test(value);
    return new Result(status, `手机号格式有误`);
  }
  function enums(value, key, list) {
    const status = list.includes(value);
    return new Result(status, `${key}必须是${list.join(',')}中的一个`);
  }
  return {
    min,
    max,
    enums,
    required,
    isCellPhone,
  };
})();
const VALIDATIONS = ['min', 'max', 'required', 'isCellPhone', 'enum'];
/**
 * 执行请求模型属性上的所有验证方法
 * @param validationList {array} 所有验证配置
 * @param key {string} 当前验证的模型字段
 * @param value 传入的值
 * @returns {object}
 */
function execValidate(validationList, attr, value) {
  let validateMessage = '';
  const status = Object
    .keys(validationList)
    .every(key => {
      // 如果未发现指定验证器
      if (!VALIDATIONS.includes(key)) {
        validateMessage = `${key}验证器暂未添加,请修改请求模型`;
        return false;
      }
      const {
        status,
        message,
      } = validate[key](
        value,
        attr,
        validationList[key],
      );
      if (!status) {
        validateMessage = message;
      }
      return status;
    });
  return {
    status,
    validateMessage,
  };
}
export default function (model, data) {
  let validateMessage = '', status = false;
  // 必须有验证器
  if (model === null) {
    return validateMessage = '请添加请求验证器';
  }
  // 验证模型的每个字段
  let validateResult = Object
    .keys(model)
    .every(key => {
      const modelValue = model[key];
      const dataValue = data[key];
      // 字段必须有type
      if (!modelValue.type) {
        validateMessage = `${key}添加类型`;
        return false;
      }
      // 执行每个字段的验证器
      const validationList = modelValue.validation;
      ({
        status
        , validateMessage,
      } = execValidate(
        validationList,
        key,
        dataValue,
      ));
      return status;
    });
  return validateResult || validateMessage;
}
