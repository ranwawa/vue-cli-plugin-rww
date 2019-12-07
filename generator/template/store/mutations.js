/**
 * @author ZMN
 * @since 2019/11/6
 * @desc Vuex 方法
 * @remark
 */
/* eslint-disable */
import { header } from '../api/request';

export default {
  // 设置用户信息
  setUserInfo(state, value) {
    state.userInfo = value;
    header.token = value.token;
    uni.setStorageSync('user-info', value);
  },
};
