<!-- author: ranwawa -->
<!-- since: 2019/11/27 -->
<!-- desc: 按钮组件 -->
<!-- remark:  -->
<template>
  <button
    :class="computedClass"
    :style="computedStyle"
    class="zmn-btn"
    :open-type="openType"
    :withCredentials="withCredentials"
    @getuserinfo="$emit('getuserinfo', $event)"
    @getphonenumber="$emit('getphonenumber', $event)"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
<script>
import _debounce from 'lodash.debounce';

const SIZE = {
  default: 50,
  mini: 30,
};
export default {
  name: 'zmn-btn',
  data() {
    return {
      // 点击状态
      isClicking: false,
      // 触发点击事件
      emitClick: _debounce(() => {
        this.$emit('click');
        this.isClicking = false;
      }, 333),
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    withCredentials: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: '',
    },
    openType: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    computedClass() {
      const params = {
        'btn-disabled': this.disabled,
        'btn-clicking': this.isClicking,
        'btn-theme': this.type === 'theme',
        'btn-plain': this.type === 'plain',
        'btn-mini': this.size === 'mini',
      };
      return Object
        .entries(params)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);
    },
  },
  methods: {
    pxToVW(size) {
      return `${(size / 375 * 100)}vw`;
    },
    handleClick() {
      this.isClicking = true;
      if (!this.disabled) {
        this.emitClick();
      }
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  .zmn-btn {
    @include linear-gradient;
    position: relative;
    z-index: 1;
    height: px2vw(50);
    border-radius: $bdrs-lg;
    color: #fff;
    font-size: $fz-lg;
    line-height: px2vw(50);
    text-align: center;

    &::after {
      border: none;
    }
  }

  .btn-disabled::after {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: rgba(255, 255, 255, .4);
    content: ' ';
  }

  .btn-clicking {
    background-color: rgba(240, 91, 40, .1) !important;
  }

  .btn-theme {
    border: 1px solid $c-theme;
    background: transparent;
    color: $c-theme;
  }

  .btn-plain {
    background: none !important;
    color: $c-light;
  }

  .btn-mini {
    height: px2vw(30);
    padding: 0 px2vw(6);
    border-radius: px2vw(4);
    font-size: $fz-sm;
    line-height: px2vw(30);
  }
</style>
