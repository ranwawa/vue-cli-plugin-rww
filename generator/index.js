/**
 * @author 冉娃娃
 * @since 2019/12/5
 * @desc
 * @remark
 */
const { EOL } = require('os');
const fs = require('fs');
const MAIN_SPLIT_FLAG = /Vue\.config\.productionTip/;
const PACKAGES = {
  scripts: {
    'pretty-quick': 'pretty-quick --staged --check src/** --verbose',
    'eslint': 'eslint src/**',
  },
  dependencies: {
    'vuex': '*',
    'lodash': '*',
    'async-validator': '*',
  },
  devDependencies: {
    'node-sass': '*',
    'sass-loader': '*',
    'rww-sass': '*',
    'style-resources-loader': '*',
    'eslint': '*',
    'eslint-plugin-vue': '*',
    'eslint-plugin-prettier': '*',
    'eslint-plugin-import': '*',
    'eslint-config-airbnb-base': '*',
    'eslint-config-prettier': '*',
    'husky': '*',
    'prettier': '*',
    'pretty-quick': '*',
    'stylelint': '*',
    'stylelint-prettier': '*',
    'stylelint-config-prettier': '*',
    'stylelint-config-standard': '*',
    'stylelint-webpack-plugin': '*',
  },
};
const MAIN_INJECTIONS = [
  `import store from '@/store';`,
  `import uniDecorator from '@/assets/js/uni_decorator';`,
];
const TEMPLATE_PUBLIC = 'public';
const TEMPLATE_ROOT = './';
function injectSomeThingToMainJS(api, something) {
  api.afterInvoke(() => {
    const contentMain = fs.readFileSync(
      api.entryFile,
      { encoding: 'utf-8' },
    );
    const lines = contentMain.split(/\r?\n/g);
    const renderIndex = lines.findIndex(line => line.match(MAIN_SPLIT_FLAG));
    lines[renderIndex] += `\n${something}`;
    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' });
  });
}
module.exports = (api = {}, options, presets) => {
  // creating new template
  api.render(`${TEMPLATE_ROOT}${TEMPLATE_PUBLIC}`);
  api.render(`${TEMPLATE_ROOT}${options.project}`);
  // extending package
  api.extendPackage(PACKAGES);
  // changing main js
  MAIN_INJECTIONS.forEach(ele => api.injectImports(api.entryFile, ele));
};
module.exports.hooks = (api) => {
  const codeList = [
    `Vue.prototype.$store = store;`,
    'uniDecorator();'
  ];
  injectSomeThingToMainJS(
    api,
    codeList.join('\n'),
  );
};
