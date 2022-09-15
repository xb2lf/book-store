<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 22:46:11
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 23:01:19
 * @Description: 
-->
<template>
  <van-swipe
    v-if="banners.length"
    class="home-swipe"
    :autoplay="3000"
    lazy-render
    indicator-color="white"
  >
    <van-swipe-item v-for="item in banners" :key="item.id">
      <img :src="item.img_url" :alt="item.title" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.home-swipe {
  width: 100%;
  height: 180px;
}
</style>
