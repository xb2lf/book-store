<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 14:34:19
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 22:43:20
 * @Description: 
-->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <van-image
      class="goods-image"
      width="100%"
      height="375"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      :num="detail.stock"
      :price="`${detail.price}.00`"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">{{
          detail.is_recommend === 1 ? '推按' : ''
        }}</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAddCart"
          >加入购物车</van-button
        >
        <van-button type="danger" @click="handleJumpCart">立即购买</van-button>
      </template>
    </van-card>
    <van-tabs v-model:active="activeTab" class="detail-tabs">
      <van-tab title="概述">
        <div class="detail-desc" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div
          class="detail-comments"
          v-for="item in detail.comments"
          :key="item.id"
        >
          <h3>{{ item.reply }}</h3>
          <img
            :src="item.pics_url[0]"
            width="50%"
            height="180"
            alt=""
            @click="handleShowImgs"
          />
          <van-image-preview
            v-show="isShow"
            :images="item.pics"
          ></van-image-preview>
          <p>关联订单:{{ item.order_id }}</p>
          <p>价格:{{ `￥${item.rate}` }}</p>
          <p>评论内容:{{ item.content }}</p>
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ImagePreview, Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, computed, onMounted, toRefs } from 'vue';
import { useStore } from 'vuex';
import NavBar from '@/components/common/navBar/NavBar.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';
import { getDetail } from 'network/detail';
import { addCart } from 'network/cart';
export default {
  name: 'Detail',
  components: { NavBar, GoodsList, VanImagePreview: ImagePreview.Component },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const title = computed(() => route.meta.title);
    const id = ref(0);
    const book = reactive({
      detail: {},
      like_goods: [],
    });
    const activeTab = ref(0);
    const isShow = ref(false);

    const handleShowImgs = () => {
      isShow.value = true;
    };

    const handleAddCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 })
        .then((res) => {
          if (res.status == '201' || res.status == '204') {
            Toast.success('添加成功');
            store.dispatch('updateCart');
          }
        })
        .catch((err) => console.log(err));
    };

    const handleJumpCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 })
        .then((res) => {
          if (res.status == '201' || res.status == '204') {
            Toast.success('添加成功,显示购物车');
            store.dispatch('updateCart');
            router.push('/shopcart');
          }
        })
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      id.value = route.query.id;
      getDetail(id.value)
        .then((res) => {
          book.detail = res.goods;
          book.like_goods = res.like_goods;
        })
        .catch((err) => console.log(err));
    });
    return {
      title,
      id,
      ...toRefs(book),
      activeTab,
      handleShowImgs,
      handleAddCart,
      handleJumpCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-image {
  margin-top: 50px;
}
::v-deep(.van-card__content) {
  text-align: left;
}
.detail-tabs {
  margin-bottom: 50px;
  .detail-desc {
    padding: 10px;
    ::v-deep(img) {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
