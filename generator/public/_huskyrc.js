/**
 * @author 冉娃娃
 * @since 2019/12/27
 * @desc git钩子配置
 * @remark
 */
const tasks = arr => arr.join(' && ');
const PRE_COMMIT = [
  'npm run pretty-quick',
  'npm run eslint',
];
module.exports = {
  'hooks': {
    'pre-commit': tasks(PRE_COMMIT),
    'pre-push': tasks([ ]),
  },
};
