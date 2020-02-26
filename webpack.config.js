/**
 * @author 冉娃娃
 * @since 2020/1/8
 * @desc 纯粹是用来激活ide的相关功能的
 * @remark
 */
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
