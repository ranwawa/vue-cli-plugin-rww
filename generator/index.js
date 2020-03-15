/**
 * @author 冉娃娃
 * @since 2019/12/5
 * @desc
 * @remark
 */
const { EOL } = require('os');
const fs = require('fs');
const mainSplitFlat = /Vue\.config\.productionTip/;
function importSomethingToMainJS(api, something = '') {
  api.injectImports(
    api.entryFile,
    something,
  );
}
/**
 * 注入内容到main.js文件
 * @param api {object}
 * @param something
 */
function injectSomeThingToMainJS(api, something = '') {
  if (something) {
    api.afterInvoke(() => {
      const contentMain = fs.readFileSync(
        api.entryFile, { encoding: 'utf-8' });
      const lines = contentMain.split(/\r?\n/g);
      const renderIndex = lines.findIndex(line => line.match(mainSplitFlat));
      // lines[renderIndex] += `\n  Vue.use('hello-world', helloWorld);`;
      lines[renderIndex] += `\n${something}`;
      fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' });
    });
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
  // 公共包
  extendPackage({
    dependencies: {
      'vuex': '*',
      'lodash': '*',
      'async-validator': '*',
    },
    devDependencies: {
      'rww-sass': '*',
      'node-sass': '*',
      'sass-loader': '*',
      'eslint-plugin-vue': '*',
      'style-resources-loader': '*',
      "@vue/eslint-config-airbnb": "*",
      'husky': '*',
      'prettier':'*',
      'pretty-quick': '*',
      "eslint-config-prettier": '*',
      "stylelint-prettier": "*",
      "stylelint-config-prettier": '*',
      "stylelint": "*",
      "stylelint-config-standard": "*",
      "stylelint-webpack-plugin": "*",
    },
  });
  [
    `import store from '@/store';`,
    `import * as api from '@/api';`,
    `import extend_uni from '@/assets/js/uni_decorator';`,
    `import { $console } from '@/assets/js/vue_prototype';`,
  ].forEach(ele => {
    importSomethingToMainJS(api, ele);
  });
};
module.exports.hooks = (api) => {
  const codeList = [
    `Vue.prototype.$api = $api;`,
    `Vue.prototype.$store = store;`,
    `Vue.prototype.$console = $console;`,
  ];
  injectSomeThingToMainJS(
    api,
    codeList.join('\n'),
  );
};
