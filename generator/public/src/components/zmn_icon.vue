<!-- author: ranwawa -->
<!-- since: 2019/11/21 -->
<!-- desc: 图标组件 -->
<!-- remark: -->
<template>
  <text
    :class="computedIcon"
    :style="computedStyle"
    class="zmn-icon"
  ></text>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '14',
    },
    color: {
      type: String,
      default: 'inherit',
    },
  },
  computed: {
    computedIcon() {
      return `iconfont icon-${this.icon}`;
    },
    computedStyle() {
      const fontSize = this.size / 375 * 100;
      let style = `color:${this.color};font-size:${fontSize}vw;`;
      if (fontSize < 10) { /* 兼容浏览器,否则低于10px的无法缩小 */
        style += `transform:scale(${this.size / 10});`;
      }
      return style;
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>

</style>
