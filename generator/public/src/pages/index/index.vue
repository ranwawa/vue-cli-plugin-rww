<!-- @format -->

<template>
  <view>
    hello world
  </view>
</template>

<script>
import { getCurrentArea } from '@/api';

export default {
  async onLoad() {
    const res = await getCurrentArea({
      name: '冉娃娃',
      mobile: '13883198386',
    });
    console.log(res);
  },
};
</script>

<style scoped lang="scss"></style>
