<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 16:48:34
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 23:14:21
 * @Description: 
-->
<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="item of recommends.slice(0, 4)"
      :key="item.id"
    >
      <a href="#" @click.prevent="handleJump(item.id)">
        <img v-lazy="item.cover_url" :alt="item.description" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const router = useRouter();
    function handleJump(id) {
      router.push({ path: '/detail', query: { id } });
    }

    return {
      handleJump,
    };
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  display: flex;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eeeeee;
  font-size: 12px;
  .recommend-item {
    flex: 1;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>
