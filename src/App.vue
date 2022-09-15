<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 12:26:25
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 22:45:48
 * @Description: 
-->
<template>
  <router-view />
  <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view> -->
  <nav>
    <router-link to="/" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link to="/shopcart" class="tab-bar-item">
      <div class="icon">
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link to="/profile" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-yonghu"></i></div>
      <div>我的</div>
    </router-link>
  </nav>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('updateCart');
    });

    return {};
  },
};
</script>

<style lang="scss">
@import 'assets/css/base.css';
@import 'assets/css/iconfont.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-heigh-text);
    }
  }
  .tab-bar-item {
    height: 50px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    font-size: var(--font-size);
    .icon {
      width: 24px;
      height: 24px;
      margin-top: 5px;
    }
  }
}
</style>
