<!--
 * @Author: {baixiao}
 * @Date: 2022-09-15 09:52:40
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 10:56:39
 * @Description: 
-->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
export default {
  name: 'Collect',
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

<style lang="scss" scoped></style>
