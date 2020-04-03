/** @format */

import Schema from 'async-validator';
import { config, ajaxConfig } from '../config';
import { HTTP_STATUS, TYPE } from '../assets/js/constants';

const { isValidateRequest } = ajaxConfig;
// 公共请求头
export const header = {
  token: config.token,
};
export async function asyncValidate(model, data) {
  try {
    const validator = new Schema(model);
    await validator.validate(data, { first: true });
    return [null, data];
  } catch (e) {
    const [error] = e.errors;
    return [error, null];
  }
}
function validateResponse(res) {
  return [null, res.data];
}
function handleTCPError(err) {
  // todo 这里需要区分各种不同的tcp错误状态
  uni.showModalText('网络异常请稍后再试');
  return [err, null];
}
function handleHTTPError(res) {
  uni.showModalText('服务异常请稍后再试');
  return [res, null];
}
function handleServerError(res) {
  uni.showModalText(res.message);
  return [res, null];
}
function showLoading(isDisableLoading) {
  const { isEnableLoading } = ajaxConfig;
  if (isEnableLoading && !isDisableLoading) {
    uni.showLoading({ title: '正在加载' });
  }
}
export const request = async options => {
  const {
    url = '',
    data = {},
    requestModel = null,
    method = TYPE.GET,
  } = options;

  if (isValidateRequest && requestModel && !data.isDisableValidate) {
    const [err] = await asyncValidate(requestModel, data);
    if (err) {
      uni.showModalText(err.message);
      return [err, null];
    }
  }
  showLoading(data.isDisableLoading);
  const [err, res] = await uni.request({
    method,
    header,
    data,
    url,
  });
  uni.hideLoading();
  if (err) {
    handleTCPError(err);
    return [err, res];
  }
  if (res.statusCode !== HTTP_STATUS.OK) {
    return handleHTTPError(res);
  }
  const resData = res.data;
  if (resData.status !== HTTP_STATUS.OK) {
    return handleServerError(resData);
  }
  return validateResponse(resData);
};
export const upload = async (options = {}) => {
  try {
    showLoading(options.isDisableLoading);
    const [err, res] = await uni.uploadFile(options);
    uni.hideLoading();
    if (err) {
      handleTCPError(err);
      return [err, res];
    }
    if (res.statusCode !== HTTP_STATUS.OK) {
      return handleHTTPError(res);
    }
    const resData = JSON.parse(res.data);
    return [null, resData.data];
  } catch (e) {
    return [e, null];
  }
};
