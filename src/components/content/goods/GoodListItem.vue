<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 18:16:00
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 15:51:03
 * @Description: 
-->
<template>
  <div class="goods-item" @click="handleJump(product.id)">
    <img v-lazy="product.cover_url" alt="" />
    <div class="goods-info">
      <p>{{ product.title }}</p>
      <span class="price"><small>￥</small>{{ product.price }}</span>
      <span class="collect">{{ product.collects_count }}</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'GoodListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const router = useRouter();

    const handleJump = (id) => {
      router.push({ path: '/detail', query: { id } });
    };
    return {
      handleJump,
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-item {
  width: 46%;
  padding-bottom: 40px;
  position: relative;
  img {
    width: 100%;
    height: 180px;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
    }
    .collect::before {
      content: '';
      width: 14px;
      height: 14px;
      position: absolute;
      left: -15px;
      top: -1px;
      background: url('~assets/images/collection.png') 0 0/14px 14px;
    }
  }
}
</style>
