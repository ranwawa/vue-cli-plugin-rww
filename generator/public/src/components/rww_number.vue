<!-- author: ranwawa -->
<!-- since: 2019/12/2 -->
<!-- desc: 数字加减组件 -->
<!-- remark:  -->
<template>
  <view
    class="container"
    @click.stop
  >
    <view @click="handleChange(-1)">
      <view class="iconfont icon-jian"></view>
    </view>
    <rww-field
      type="number"
      :value="value"
      :clear-able="false"
      @input="handleChange($event)"
    ></rww-field>
    <view
      class="iconfont icon-jia"
      @click="handleChange(1)"
    ></view>
  </view>
</template>
<script>
export default {
  name: 'rww-number',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleChange(input) {
      let result = '';
      if (typeof input === 'string') {
        result = Number.parseInt(input, 10);
      } else {
        result = this.value + input;
      }
      this.$emit('input', result);
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  .container {
    @include flex-row;
  }


  .iconfont {
    padding: .1em; /* 加大可点击区域 */
    margin: -.1em;
    font-size: 1.5em;
  }

  .icon-jia {
    color: $c-theme;
  }

  .icon-jian {
    color: $c-light;
  }
</style>
