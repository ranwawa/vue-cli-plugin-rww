<!-- author: ranwawa -->
<!-- since: 2019/11/22 -->
<!-- desc: 输入框组件 -->
<!-- remark:  -->
<template>
  <view
    class="zmn-field"
    @click="$emit('click')"
  >
    <view
      v-if="title"
      class="zmn-field-title"
    >
      {{ title }}
    </view>
    <text
      v-if="leftIcon"
      :class="leftIcon"
      class="iconfont icon-left"
    ></text>
    <view class="zmn-field-wrapper">
      <view
        v-if="readonly"
        :class="{'zmn-field-readonly_placeholder': !value}"
        class="zmn-field-readonly"
      >
        {{ value || placeholder }}
      </view>
      <input
        v-else
        :class="computedInputClass"
        class="zmn-field-input"
        :value="value"
        :type="type"
        :disabled="disabled"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :confirm-type="confirmType"
        :focus="focus"
        @input="$emit('input', $event.detail.value)"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="$emit('confirm', $event.detail.value)"
      />
      <view
        v-show="isShowClose"
        class="zmn-field-closer iconfont icon-clear-solid"
        @click="$emit('input', '')"
      />
    </view>
    <text
      v-if="showArrow"
      class="iconfont icon-arrow-right"
    ></text>
    <slot name="button"></slot>
  </view>
</template>
<script>
export default {
  name: 'zmn-field',
  model: {
    prop: 'value',
    event: 'input',
  },
  data() {
    return {
      isFocus: false,
    };
  },
  props: {
    focus: {
      type: Boolean,
      default: false,
    },
    confirmType: {
      type: String,
      default: 'done',
    },
    // 输入框内左侧图标
    leftIcon: {
      type: String,
      default: '',
    },
    placeholderStyle: {
      type: String,
      default: `color:#999;font-size: ${14 / 3.75}vw`,
    },
    maxLength: {
      type: String,
      default: '140',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: [
        Object,
        Boolean,
        String,
        Number,
        undefined,
        Symbol,
      ],
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    clearAble: {
      type: Boolean,
      default: true,
    },
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 是否显示清空按钮
    isShowClose() {
      return this.value.length > 0
        && !this.readonly
        && this.clearAble
        && this.isFocus;
    },
    // 输入框样式
    computedInputClass() {
      const style = {
        'zmn-field-input_disabled': this.disabled,
        'zmn-field-input_clear': this.isShowClose,
        'zmn-field-input_leftIcon': this.leftIcon,
      };
      return Object
        .entries(style)
        .filter(([key, value]) => value)
        .map(([key]) => key)
        .join(' ');
    },
  },
  methods: {
    handleFocus() {
      this.isFocus = true;
      this.$emit('focus');
    },
    handleBlur() {
      this.isFocus = false;
      this.$emit('blur');
    },
    test(e) {
      console.log(e, 123);
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  .zmn-field {
    @include flex-row;
    position: relative;
    font-size: 0; /* 兼容支付宝小程序 要不然input和view下边会有空隙 */

    &-title {
      margin-right: $section-md;
      font-size: $fz-md;
      white-space: nowrap;
    }

    &-wrapper, &-input, &-readonly {
      flex: 1 1 auto;
      height: px2vw(50);
      padding: 0;
      margin: 0;
      position: relative;
      background: #fff;
      font-size: $fz-md;
      line-height: px2vw(50);

    }

    &-readonly {
      &_placeholder {
        color: $c-light;
        font-size: $fz-md;
      }
    }

    &-input {
      &_disabled {
        background-color: $bgc-comp;
        color: $c-gray;
      }

      &_clear {
        padding-right: 1.5em;
      }

      &_leftIcon {
        padding-left: 2em;
      }
    }

    &-closer {
      padding: px2vw(5) { /* 扩大可点击区域 */
      };
      position: absolute;
      z-index: 2; /* 兼容微信小程序 要不然点击事件会失效 */
      top: 50%;
      right: 0;
      color: #999;
      transform: translateY(-50%);
    }
  }

  /* 左侧图标 */
  .icon-left {
    height: 1em;
    margin: auto .5em;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .icon-arrow-right {
    padding-left: .5em;
    margin-top: .2em;
    color: $c-light;
    font-size: $fz-xs;
  }
</style>
