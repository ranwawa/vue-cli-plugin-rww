<!-- author: ranwawa -->
<!-- since: 2019/12/10 -->
<!-- desc: 缺省页面组件 -->
<!-- remark:  -->
<template>
  <view class="zmn-empty">
    <view class="empty-img">
      <image
        class="empty-img-front"
        :src="src"
      ></image>
    </view>
    <view class="empty-title">
      {{ title }}
    </view>
  </view>
</template>
<script>
/* eslint-disable max-len */
export default {
  name: 'zmn-empty',
  props: {
    title: {
      type: String,
      default: '暂无数据~',
    },
    src: {
      type: String,
      default: '',
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  .zmn-empty {
    @include flex-column;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto {
      top: -20vh
    };
  }

  .empty-img {
    width: 165px;
    height: 116px;
    margin-bottom: px2vw(20);
    background: no-repeat 100% 100% url("data:image/png;base64,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");

    &-front {
      width: 100%;
      height: 100%;
    }
  }

  .empty-title {
    color: $c-light;
  }
</style>
