/**
 * @author ZMN
 * @since 2019/11/6
 * @desc 获取平台环境
 * @remark
 */

/* eslint-disable */
const getEnvironment = () => {
  let evn = '';
  // #ifdef H5
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('MicroMessenger') !== -1) {
    evn = '微信公众号';
  } else if (userAgent.indexOf('AliApp') !== -1) {
    evn = '支付宝生活号';
  } else {
    evn = '浏览器';
  }
  // #endif
  // #ifdef MP-ALIPAY
  evn = '支付宝小程序';
  // #endif
  // #ifdef MP-WEIXIN
  evn = '微信小程序';
  // #endif
  return evn;
};
export const environment = getEnvironment();
