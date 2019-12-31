<!-- author: ranwawa -->
<!-- since: 2019/11/30 -->
<!-- desc: 价格组件 -->
<!-- remark:  -->
<template>
  <view class="rww-price">
    ￥
    <text class="rww-price-integer">
      {{ pInteger }}
    </text>
    .
    <text class="rww-price-float">
      {{ pFloat }}
    </text>
  </view>
</template>
<script>
export default {
  name: 'rww-price',
  data() {
    return {
      pInteger: '',
      pFloat: '',
    };
  },
  props: {
    price: {
      type: [Number, String],
      default: 0,
    },
  },
  watch: {
    price: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          if (typeof newValue === 'string') {
            newValue = parseFloat(newValue);
          }
          newValue /= 100;
          [this.pInteger, this.pFloat = '00'] = newValue
            .toFixed(2)
            .split('.');
        } else {
          this.pInteger = '0';
          this.pFloat = '00';
        }
      },
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  .rww-price {
    color: $c-theme;
    font-weight: bold;

    &-integer {
      font-size: px2vw(24);
      line-height: 1em;
    }
  }
</style>
