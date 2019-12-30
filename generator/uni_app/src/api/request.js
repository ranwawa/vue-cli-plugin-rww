import {
  default as config, ajaxConfig,
} from '@/config';
import requestValidate from '@/models/request_validate';
import * as responseValidate from '@/models/response_validate';
// 公共请求头
export const header = {
  token: config.token,
  shopId: config.shopId,
  provinceId: '500000',
  provinceName: '%e9%87%8d%e5%ba%86%e5%b8%82',
  cityId: '500103',
  cityName: '%e9%87%8d%e5%ba%86%e5%b8%82',
};
function baseResponseValidate(result, func, ...param) {
  if (ajaxConfig.isValidateResponse) {
    const validateResult = func(...param);
    if (typeof validateResult === 'string') {
      result[0] = new Error(validateResult);
    }
  }
  return result;
}
const request = (options) => {
  const {
    url = '',
    data = {},
    requestModel = null,
    responseModel = null,
    method = 'GET',
  } = options;
  const {
    isValidateRequest,
    isValidateResponse,
    isEnableLoading,
  } = ajaxConfig;
  // 请求验证
  if (isValidateRequest) {
    const validateResult = requestValidate(requestModel, data);
    if (typeof validateResult === 'string') {
      // todo 这里需要抛出统一的错误验证
      return Promise.resolve([new Error(validateResult), null]);
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
                    result,
                    responseValidate.validateOk,
                    requestModel,
                    data,
                  );
                  break;
                }
                default: {
                  result = baseResponseValidate(
                    result,
                    responseValidate.validateServer,
                    status,
                    data,
                  );
                  break;
                }
              }
              break;
            }
            default: {
              result = baseResponseValidate(
                result,
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
            result,
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
