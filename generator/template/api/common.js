import request from './request';

const common = {
  // 根据经纬度获取当前所在位置
  getCurrentArea(data = {}) {
    return request({
      data,
      url: 'area/getCurrentArea',
      method: 'GET',
      requestModel: null,
      responseModel: null,
    });
  },
};
export default common;
