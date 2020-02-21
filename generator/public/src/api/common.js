import request from './request';
import { requestModel, responseModel } from '../models';

const common = {
  // 根据经纬度获取当前所在位置
  getCurrentArea(data = {}) {
    return request({
      data,
      url: 'area/getCurrentArea',
      method: 'GET',
      requestModel: requestModel.objectName,
      responseModel: responseModel.objectName,
    });
  },
};
export default common;
