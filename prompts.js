/**
 * @author 冉娃娃
 * @since 2019/12/12
 * @desc 模板选择文件
 * @remark
 */
const PROJECT = {
  UNI: 'uni-app',
  NUXT: 'nuxt',
};
const TYPE = {
  LIST: 'list',
};
module.exports = [
  {
    type: TYPE.LIST,
    name: 'project',
    message: 'select a template',
    default: PROJECT.UNI,
    choices: [
      {
        name: PROJECT.UNI,
        value: PROJECT.UNI,
      },
      {
        name: PROJECT.NUXT,
        value: PROJECT.NUXT,
      },
    ],
  },
];
