<!--
 * @Author: {baixiao}
 * @Date: 2022-09-15 10:03:24
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 10:59:26
 * @Description: 
-->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <div class="not-found-main">
      <h1>404 Not Found</h1>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
export default {
  name: 'NotFound',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const title = computed(() => route.meta.title);
    return {
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.not-found-main {
  width: 100%;
  height: calc(100% - 45px);
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
