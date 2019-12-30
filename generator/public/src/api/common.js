import request from './request';
import requestModels from '../models/request_models';
import responseModels from '../models/response_models';

const common = {
  // 根据经纬度获取当前所在位置
  getCurrentArea(data = {}) {
    return request({
      data,
      url: 'area/getCurrentArea',
      method: 'GET',
      requestModel: requestModels.getCurrentArea,
      responseModel: responseModels.getCurrentArea,
    });
  },
};
export default common;
