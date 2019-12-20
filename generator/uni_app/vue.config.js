/**
 * @author 冉娃娃
 * @since 2019/12/20
 * @desc
 * @remark
 */

/* eslint-disable camelcase */
const path = require('path');

const {
  npm_lifecycle_event,
  VUE_APP_PLATFORM,
} = process.env;
const devtool = npm_lifecycle_event
  .includes('build') ? false : 'inline-source-map';
module.exports = {
  chainWebpack: (config) => {
    // 引入公共scss
    [
      'vue',
      'normal',
      'vue-modules',
      'normal-modules',
    ].forEach((type) => {
      const rule = config
        .module
        .rule('scss')
        .oneOf(type);
      rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: ['rww-sass/_index.scss'],
        });
    });
    // 增加环境变量信息
    config
      .plugin('define')
      .tap((definitions) => {
        Object.assign(
          definitions[0]['process.env'],
          {
            npm_lifecycle_event: `"${npm_lifecycle_event}"`,
            VUE_APP_PLATFORM: `"${VUE_APP_PLATFORM}"`,
          },
        );
        return definitions;
      });
  },
  configureWebpack: {
    devtool,
  },
};
