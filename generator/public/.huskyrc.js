/**
 * @author 冉娃娃
 * @since 2019/12/27
 * @desc git钩子配置
 * @remark
 */
const tasks = arr => arr.join(' && ');
module.exports = {
  'hooks': {
    'pre-commit': tasks(['pretty-quick --staged',]),
    'pre-push': tasks([ ]),
  },
};
