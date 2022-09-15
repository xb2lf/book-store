<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 18:15:26
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 21:45:24
 * @Description: 
-->
<template>
  <div class="goods">
    <good-list-item
      v-for="item in goods"
      :key="item"
      :product="item"
    ></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem.vue';
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { GoodListItem },
};
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
</style>
