/** @format */

import Schema from 'async-validator';
import { config, ajaxConfig } from '../config';
import { HTTP_STATUS, TYPE } from '../assets/js/constants';

const PREFIX = /^http/;
// 公共请求头
export const header = {
  token: config.token,
};
async function validateRequest(requestModel, data) {
  try {
    const { isValidateRequest } = ajaxConfig;
    if (isValidateRequest && !data.isDisableValidate) {
      const validator = new Schema(requestModel);
      await validator.validate(data, { first: true });
      return [null, data];
    }
    return [null, data];
  } catch (e) {
    const [error] = e.errors;
    uni.showModalText(error.message);
    return [error, null];
  }
}
function validateResponse(res) {
  return [null, res];
}
function handleTCPError(err) {
  // todo 这里需要区分各种不同的tcp错误状态
  return [err, null];
}
function handleHTTPError(res) {
  return [res, null];
}
function handleServerError(res) {
  return [res, null];
}
function showLoading(isDisableLoading) {
  const { isEnableLoading } = ajaxConfig;
  if (isEnableLoading && !isDisableLoading) {
    uni.showLoading({ title: '正在加载' });
  }
}
const request = async options => {
  const {
    url = '',
    data = {},
    requestModel = null,
    method = TYPE.GET,
  } = options;
  let [err, res] = await validateRequest(requestModel, data);
  if (err) {
    return [err, null];
  }
  showLoading(data.isDisableLoading);
  [err, res] = await uni.request({
    method,
    header,
    data,
    url: PREFIX.test(url) ? url : `${config.apiUrl}${url}`,
  });
  uni.hideLoading();
  if (err) {
    handleTCPError(err);
    return [err, res];
  }
  const resData = res.data;
  if (res.statusCode === HTTP_STATUS.OK) {
    if (resData.code === HTTP_STATUS.OK) {
      return validateResponse(resData);
    }
    return handleServerError(resData);
  }
  return handleHTTPError(res);
};
export default request;
