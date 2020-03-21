import { default as config, ajaxConfig } from '@/config';
import schema from 'async-validator';
import * as responseValidate from './response_validate';
// 公共请求头
export const header = {
  token: config.token,
};
function baseResponseValidate(result, func, ...param) {
  let validateResult;
  if (ajaxConfig.isValidateResponse) {
    validateResult = func(...param);
    if (validateResult[0]) {
      $console(validateResult);
    }
  }
  return result;
}
const request = async (options) => {
  const {
    url = '',
    data = {},
    requestModel = null,
    responseModel = null,
    method = 'GET',
  } = options;
  const { isValidateRequest, isValidateResponse, isEnableLoading } = ajaxConfig;
  // 请求验证
  if (isValidateRequest) {
    const validator = new schema(requestModel);
    const result = await validator.validate(data, { first: true });
    if (result) {
      const [error] = result.errors;
      uni.showShowModal({
        title: '提示',
        showCancel: false,
        content: error.message,
      });
      return Promise.resolve([new Error(error), null]);
    }
  }
  // loading框
  if (isEnableLoading && !data.isHideLoading) {
    uni.showToast({
      icon: 'none',
      title: '正在加载',
    });
  }
  function cb(resolve) {
    uni.request(
      {
        method,
        header,
        data,
        url: `${config.apiUrl}${url}`,
        success(res) {
          const { statusCode, data } = res;
          let result = [null, res];
          switch (statusCode) {
            case 200: {
              const { status } = data;
              switch (status) {
                case 200: {
                  result = baseResponseValidate(
                    responseValidate.validateOk,
                    responseModel,
                    data.data,
                  );
                  break;
                }
                default: {
                  result = baseResponseValidate(
                    responseValidate.validateServer,
                    status,
                    data.data,
                  );
                  break;
                }
              }
              break;
            }
            default: {
              result = baseResponseValidate(
                responseValidate.validateHTTP,
                statusCode,
                res,
              );
            }
          }
          resolve(result);
        },
        fail(err) {
          // todo 这里也需要统一的错误验证包装一下
          let result = [err, null];
          result = baseResponseValidate(
            responseValidate.validateNetWork,
            err,
          );
          resolve(result);
        },
        complete() {},
      },
    );
  }
  return new Promise(cb);
};
export default request;
