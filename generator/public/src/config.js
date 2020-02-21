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
  'mp-weixin': {},
  // 网页
  h5: {},
  // 公共配置
  comm: {
    // 接口地址
    apiUrl: {
      dev: '',
      test: '',
      build: '',
    },
    token: {
      dev: '',
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
