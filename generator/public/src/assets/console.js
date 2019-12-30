import _isError from 'lodash.iserror';
import { environment } from './get_environment';
import store from '../../store';

/**
 * 输出/上报错误日志
 * @param err 错误信息
 * @param options
 * @param vm vue页面实例
 * @param status 哪里捕获的错误
 */
function trackError(err = {}, options = {}, vm = {}, status = '') {
  // 缓存起来
  // 同一个错误只发送一次
  const trackItem = `${vm.route}${status}${err.message}`;
  if (process.env.NODE_ENV !== 'production') {
    console.log('-----------------');
    console.warn(err);
    console.log(options, status);
    console.log('-----------------');
  }
  if (vm.$trackList.includes(trackItem)) {
    return;
  }
  // 构造错误信息数据
  const { locationCity, userInfo, shopDetail } = vm.$store.state;
  const param = {
    environment,
    options,
    status,
    userInfo,
    route: vm.route,
    errType: err.name,
    errMsg: err.errMsg || err.message,
    errStack: err.stack,
    system: vm.$sysInfo,
    address: locationCity,
    shopInfo: shopDetail,
    history: getCurrentPages()
      .map(ele => ele.route),
  };
  vm.$trackList.push(trackItem);
}
/**
 * 全局异常处理方法
 * 大部分情况用于本地代码报错
 * @param param
 */
function $console(param) {
  if (typeof param === 'string') {
    param = {
      err: new Error(param),
      message: '系统接口调用异常',
      isLog: true,
      isAlert: false,
    };
  } else if (_isError(param)) {
    param = {
      err: param,
      message: `${param.name}:${param.message}`,
      isLog: true,
      isAlert: true,
    };
  }
  const self = this;
  const {
    err = new Error('没有错误捕获'),
    options = {},
    isLog = true,
    isAlert = false,
    message = '',
    status = '',
  } = param;
  if (!self.$isAlerting && isAlert) {
    uni
      .showModal({
        title: '提示',
        content: message,
        showCancel: false,
      })
      .then(() => {
        const timer = setTimeout(() => {
          self.$isAlerting = false;
          clearTimeout(timer);
        }, 2000);
      });
  }
  if (isLog) {
    trackError(err, options, this, status);
  }
}

export default function extendFeatures(vm) {
  Object.assign(
    vm.prototype,
    {
      $console,
    },
  );
}
