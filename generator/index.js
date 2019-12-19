/**
 * @author 冉娃娃
 * @since 2019/12/5
 * @desc
 * @remark
 */
const { EOL } = require('os');
const fs = require('fs');
const mainSplitFlat = /Vue\.config\.productionTip/;
/**
 * 注入内容到main.js文件
 * @param api {object}
 * @param importModel {string} 引入的模块
 * @param lineCodes {string} 插入的代码片断
 */
function injectSomeThingToMainJS(api, importModel, lineCodes = '') {
  let { entryFile, afterInvoke } = api;
  const { readFileSync, writeFileSync } = fs;
  if (importModel) {
    api.injectImports(
      this,
      entryFile,
      // `import helloWorld from './components/HelloWorld.vue';`,
      importModel,
    );
    if (lineCodes) {
      afterInvoke(() => {
        const contentMain = readFileSync(entryFile, { encoding: 'utf-8' });
        const lines = contentMain.split(/\r?\n/g);
        const renderIndex = lines.findIndex(line => line.match(mainSplitFlat));
        // lines[renderIndex] += `\n  Vue.use('hello-world', helloWorld);`;
        lines[renderIndex] += lineCodes;
        writeFileSync(entryFile, lines.join(EOL), { encoding: 'utf-8' });
      });
    }
  }
}
module.exports = (api = {}, options, presets) => {
  let { render, extendPackage } = api;
  render = render.bind(api);
  extendPackage = extendPackage.bind(api);
  // 公共文件
  render('./public');
  // 具体项目的文件
  const { project } = options;
  render(`./${project}`);
  switch (project) {
    case 'uni_app': {
      break;
    }
    default:
      break;
  }
  // 常用包
  extendPackage({
    devDependencies: {
      'vuex': '*',
      'node-sass': '*',
      'sass-loader': '*',
      'style-resources-loader': '*',
      'rww-sass': '*',
      'eslint-plugin-vue': '*',
    },
  });
  injectSomeThingToMainJS(
    api,
    `import extend_uni from '@/assets/js/extend_uni'`,
  );
};
 