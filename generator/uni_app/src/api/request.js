import config from '../config';
import responseModels from '../models/response_models';

/**
 * HTTP连接正常拦截
 * @param res {Object} 服务器响应
 * @param resolve
 * @param reject
 * @param options
 */
function interceptResSuccess(res, resolve, reject, options) {
  const { statusCode, data } = res;
  let info = '';
  switch (statusCode) {
    case 200: {
      // 取响应数据的模型
      // 如果存在就要洗数据
      // 否则直接返回数据
      const arr = options.url.split('/');
      const apiName = arr[arr.length - 1];
      const modelObj = responseModels[apiName];
      if (data.status === 200 && modelObj) {
        const { data: resData } = data;
        const realData = resData[modelObj.key];
        // 清洗数据
        switch (modelObj.type) {
          case 'array':
            if (Array.isArray(realData)) {
              const cleanedData = realData.map((ele) => {
                const { item } = modelObj;
                return JSON.parse(JSON.stringify(
                  ele,
                  Object.keys(item),
                ));
              });
              resolve(cleanedData);
            } else {
              reject(new Error('返回数据类型有误'));
            }
            break;
          case 'object':
            break;
          default:
            break;
        }
      } else if (data.status !== 200) {
        let isAlert = true;
        let isLog = false;
        if (data.status === 41002) {
          console.log(uni.navigateTo);
          uni.navigateTo({
            url: '/pages/user/login',
          });
          isAlert = false;
          isLog = false;
        }
        options.res = res;
        reject({
          err: new Error('接口响应报错'),
          isLog,
          isAlert,
          options,
          message: data.message,
          status: '接口响应报错',
        });
      } else {
        resolve(data.data);
      }
      return;
    }
    case 404:
      info = '页面消失了';
      break;
    case 500:
      info = '服务器故障了';
      break;
    case 502:
      info = '谁在发版了';
      break;
    default:
      info = '网络走丢了';
      break;
  }
  if (info) {
    reject({
      err: new Error('HTTP故障'),
      isAlert: true,
      isLog: true,
      message: info,
    });
  }
}
/**
 * HTTP连接级错误拦截
 * @param err {Object} 错误信息
 * @param options
 */
function interceptResFail(err, options) {
  if (err.errMsg.includes('request:fail')) {
    return {
      err,
      options,
      isAlert: true,
      message: '服务器未打开',
      status: '连接异常',
    };
  }
  return {
    err,
    options,
    isAlert: true,
    message: err.message,
    status: '连接异常',
  };
}
/**
 * 请求拦截
 * @param model {Object} 模型
 * @param data {Object} 填充模型的数据
 * @param options
 */
function interceptReq(model, data = {}, options) {
  const newData = JSON.parse(JSON.stringify(data));
  // 没有模型时不进行检测
  if (model) {
    let errorMsg = '';
    const result = Object
      .entries(model)
      .every(([key, value]) => {
        if (value.required && !newData[key]) {
          if (!value.default) {
            errorMsg = value.error;
            return false;
          }
          newData[key] = value.default;
        }
        return true;
      });
    return [
      !!result, result ? newData : {
        options,
        message: errorMsg,
        isAlert: true,
        status: '请求参数出错',
      },
    ];
  }
  return [true, data];
}
// 公共请求头
export const header = {
  token: config.token,
  shopId: config.shopId,
  provinceId: '500000',
  provinceName: '%e9%87%8d%e5%ba%86%e5%b8%82',
  cityId: '500103',
  cityName: '%e9%87%8d%e5%ba%86%e5%b8%82',
};
const request = (options) => {
  const {
    url = '',
    data = {},
    model = null,
    method = 'GET',
  } = options;
  function cb(resolve, reject) {
    const [resStatus, interceptReqResult] = interceptReq(model, data);
    if (!resStatus) {
      reject(interceptReqResult);
    } else {
      uni
        .request(
          {
            method,
            header,
            data: interceptReqResult,
            url: `${config.apiUrl}${url}`,
            success: res => resolve(interceptResSuccess(
              res,
              resolve,
              reject,
              options,
            )),
            fail: err => reject(interceptResFail(err, options)),
            complete() {},
          },
        );
    }
  }
  return new Promise(cb);
};
export default request;
