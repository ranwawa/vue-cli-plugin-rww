/**
 * @author 冉娃娃
 * @since 2019/11/21
 * @desc 业务配置文件
 * @remark 配置公共基础信息,只和业务数据有关
 */
/**
 * ajax配置
 * @type {{isValidateRequest: boolean, isValidateResponse: boolean}}
 */
const ajaxConfig = {
  // 是否验证请求模型
  isValidateRequest: true,
  // 是否验证响应模型
  isValidateResponse: true,
  // 是否启用loading框
  isEnableLoading: true,
};
const configCollection = {
  // 微信小程序
  'mp-weixin': {
    appId: {
      dev: 'wx31d98d61754f19db',
      test: 'wx31d98d61754f19db',
      build: 'wx31d98d61754f19db',
    },
    receiveEntranceId: {
      dev: '7102',
      test: '7102',
      build: '7102',
    },
  },
  // 网页
  h5: {
    appId: {
      dev: '1',
      test: '2',
      build: '3',
    },
    receiveEntranceId: {
      dev: '7101',
      test: '7101',
      build: '7101',
    },
  },
  // 公共配置
  comm: {
    apiUrl: { // 接口地址
      dev: 'http://192.168.99.8:11243/',
      test: 'https://test-api-saas.xiujiadian.com/',
      build: 'https://api-saas.xiujiadian.com/',
    },
    shopId: {
      dev: '130',
      test: '314',
      build: '3',
    },
    token: {
      dev: 'bfb78ab1ca234e55a8929a0f0c34bf32',
      test: '',
      build: '',
    },
  },
};
configCollection['mp-alipay'] = configCollection['mp-weixin'];
configCollection.h5 = configCollection['mp-weixin'];
/**
 * 根据环境取配置信息
 * @param conf {object} 配置对象
 * @param env {string} 环境
 */
function filterConfigByEvn(conf, env) {
  const result = {};
  Object
    .keys(conf)
    .forEach((key) => {
      result[key] = conf[key][env];
    });
  return result;
}
function Config(proc) {
  const [
    env = 'dev',
    platform = 'mp-weixin',
  ] = proc
    .npm_lifecycle_event
    .split(':');
  const configObject = configCollection[platform];
  const commObject = configCollection.comm;
  const res = filterConfigByEvn(configObject, env);
  const comm = filterConfigByEvn(commObject, env);
  return Object.assign(res, comm);
}
export default new Config(process.env);
export {
  ajaxConfig,
};
