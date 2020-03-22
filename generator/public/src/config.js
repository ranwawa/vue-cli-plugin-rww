/**
 * @format
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
  isValidateRequest: true, // 是否验证请求模型
  isValidateResponse: true, // 是否验证响应模型
  isEnableLoading: true, // 是否启用loading框
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
      development: '//dev-api.ranwawa.com/',
      test: '//test-api.ranwawa.com/',
      production: '//api.ranwawa.com/',
    },
    token: {
      development: '',
      test: '',
      production: '',
    },
  },
};
/**
 * 根据环境取配置信息
 * @param conf {object} 配置对象
 * @param env {string} 环境
 */
function filterConfigByEvn(conf, env) {
  const result = {};
  Object.keys(conf).forEach(key => {
    result[key] = conf[key][env];
  });
  return result;
}
function Config(proc) {
  const { NODE_ENV, VUE_APP_PLATFORM } = proc;
  const configObject = configCollection[VUE_APP_PLATFORM];
  const commObject = configCollection.comm;
  const res = filterConfigByEvn(configObject, NODE_ENV);
  const comm = filterConfigByEvn(commObject, NODE_ENV);
  return { ...res, ...comm };
}
const config = new Config(process.env);
export { ajaxConfig, config };
