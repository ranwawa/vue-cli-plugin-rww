/**
 * @author 冉娃娃
 * @since 2019/12/12
 * @desc 模板选择文件
 * @remark
 */

module.exports = [
  {
    type: 'list',
    name: 'project',
    message: '哈子,选一个项目模板',
    default: 'uni_app',
    choices: [
      {
        name: 'uni-app模板',
        value: 'uni_app',
      },
      {
        name: 'nuxt模板',
        value: 'nuxt',
      },
    ],
  },
];
 