<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 22:00:37
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 22:10:20
 * @Description: 
-->
<template>
  <div class="back-top" @click="handleBackTop"></div>
</template>

<script>
export default {
  name: 'BackTop',
  setup(props, { emit }) {
    const handleBackTop = () => {
      emit('backTop');
    };
    return {
      handleBackTop,
    };
  },
};
</script>

<style lang="scss" scoped>
.back-top {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 20;
  background: #fcfcfc url('~assets/images/uparrow.png') no-repeat center center;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 50%;
}
</style>
