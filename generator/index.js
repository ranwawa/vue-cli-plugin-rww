/**
 * @author 冉娃娃
 * @since 2019/12/5
 * @desc
 * @remark
 */

module.exports = (api, options, presets) => {
  api.render('./template');
  api.extendPackage({
    devDependencies: {
      'vuex': '*',
      'node-sass': '*',
      'sass-loader': '*',
      'style-resources-loader': '*',
      'rww-sass': '*',
      "eslint-plugin-vue": "*",
    },
  });
  api.injectImports(
    api.entryFile,
    `import helloWorld from './components/HelloWorld.vue';`,
  );
  api.afterInvoke(() => {
    const { EOL } = require('os');
    const fs = require('fs');
    const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g);
    console.log(lines);
    const renderIndex = lines.findIndex(
      line => line.match(/Vue\.config\.productionTip/));
    lines[renderIndex] += `\n  Vue.use('hello-world', helloWorld);`;
    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' });
  });
};
 