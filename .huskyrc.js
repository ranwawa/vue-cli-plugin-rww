/**
 * @author 冉娃娃
 * @since 2019/12/27
 * @desc git钩子配置
 * @remark
 */
const tasks = arr => arr.join(' && ');
module.exports = {
  'hooks': {
    'pre-push': tasks([
      'npm version patch',
      'npm publish',
    ]),
  },
};
 