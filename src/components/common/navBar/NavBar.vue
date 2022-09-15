<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 15:17:24
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 15:51:49
 * @Description: 
-->
<template>
  <div class="nav-bar">
    <div class="bar-left" @click="handleGoBack">
      <slot name="bar-left">
        <img src="~assets/images/leftarrow.png" alt="返回" />
      </slot>
    </div>
    <div class="bar-center">
      <slot>EWShop</slot>
    </div>
    <div class="bar-right">
      <slot name="bar-right"></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'NavBar',
  setup() {
    const router = useRouter();
    const handleGoBack = () => {
      router.go(-1);
    };
    return {
      handleGoBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 45px;
  line-height: 45px;
  display: flex;
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  text-align: center;
  box-shadow: 0 2px 0px rgba(100, 100, 100, 0.1);
  .bar-left,
  .bar-right {
    width: 60px;
  }
  .bar-center {
    flex: 1;
  }
  .bar-left {
    img {
      width: 45px;
      padding: 10px;
    }
  }
}
</style>
