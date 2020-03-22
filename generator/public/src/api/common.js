/** @format */

import request from './request';
import { TYPE } from '../assets/js/constants';
import { objectName } from './request_model';
// 根据经纬度获取当前所在位置
export const getCurrentArea = data =>
  request({
    data,
    url: 'area/getCurrentArea',
    method: TYPE.GET,
    isDisableLoading: false,
    isDisableValidate: false,
    requestModel: objectName,
    responseModel: objectName,
  });
export const getCurrentArea2 = data =>
  request({
    data,
    url: 'area/getCurrentArea',
    method: TYPE.GET,
  });
