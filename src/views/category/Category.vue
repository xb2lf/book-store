<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 14:33:40
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 15:49:32
 * @Description: 
-->
<template>
  <div style="width: 100vw; height: 100vh">
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <div id="category-main">
      <div class="ordertab">
        <van-tabs v-model:active="activeTab" @click-tab="handleSwtichTab">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <van-sidebar v-model="activeMenu" class="leftmenu">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item of categories"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="category of item.children"
              :key="category.id"
              :title="category.name"
              @click="handleSelectMenu(category.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">
        <div class="goods-content">
          <van-card
            v-for="item of showGoods"
            :key="item.id"
            :num="item.sales"
            :tag="item.comments_count > 0 ? '流行' : '标签'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy-load="true"
            @click="handleJump(item.id)"
          />
        </div>
      </div>
    </div>
    <back-top v-show="isShowBackTop" @backTop="backTop"></back-top>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, onMounted, reactive, watchEffect, nextTick } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
import BackTop from '@/components/common/backtop/BackTop.vue';
import { getCategory, getCategoryGoods } from 'network/category';
export default {
  name: 'Category',
  components: { NavBar, BackTop },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = computed(() => route.meta.title);
    const activeMenu = ref(0);
    const categories = ref([]);
    const activeName = ref('1');
    const activeTab = ref(0);
    const orderTabs = {
      销量排序: 'sales',
      价格排序: 'price',
      评论排序: 'comments_count',
    };
    const currentOrder = ref('sales');
    const currGoodsId = ref(0);

    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    let betterscroll = reactive({});
    const isShowBackTop = ref(false);

    const handleSwtichTab = ({ name, title, event, disabled }) => {
      console.log(name, title, event, disabled);
      currentOrder.value = orderTabs[title];
      getCategoryGoods(currentOrder.value, currGoodsId.value)
        .then((res) => {
          goods[currentOrder.value].list = res.goods.data;
          nextTick(() => {
            // 刷新，重新计算高度
            betterscroll && betterscroll.refresh();
          });
        })
        .catch((err) => console.log(err));
    };

    const handleSelectMenu = (id) => {
      currGoodsId.value = id;
      init();
    };

    const init = () => {
      getCategoryGoods('sales', currGoodsId.value)
        .then((res) => {
          goods.sales.list = res.goods.data;
        })
        .catch((err) => console.log(err));
      getCategoryGoods('price', currGoodsId.value)
        .then((res) => {
          goods.price.list = res.goods.data;
        })
        .catch((err) => console.log(err));
      getCategoryGoods('comments_count', currGoodsId.value)
        .then((res) => {
          goods.comments_count.list = res.goods.data;
        })
        .catch((err) => console.log(err));
    };

    const backTop = () => {
      betterscroll.scrollTo(0, 0, 300);
    };

    const handleJump = (id) => {
      router.push({ path: '/detail', query: { id } });
    };

    const showGoods = computed(() => goods[currentOrder.value].list);

    onMounted(() => {
      getCategory()
        .then((res) => {
          categories.value = res.categories;
        })
        .catch((err) => console.log(err));
      init();
      // 创建BetterScroll对象
      betterscroll = new BetterScroll(document.querySelector('.goodslist'), {
        probeType: 3, // 0,1,2,3 3只要在运用时就触发scroll事件
        click: true, // 是否允许点击
        pullUpLoad: true, // 上来加载更多，默认是false
      });
      // 触发滚动事件
      betterscroll.on('scroll', (position) => {
        console.log(position);
        isShowBackTop.value = -position.y > 300;
      });
      // 上拉加载数据，触发pullingUp
      betterscroll.on('pullingUp', () => {
        const page = goods[currentOrder.value].page + 1;
        getCategoryGoods(currentOrder.value, currGoodsId.value, page)
          .then((res) => {
            goods[currentOrder.value].list.push(...res.goods.data);
            goods[currentOrder.value].page += 1;
          })
          .catch((err) => console.log(err));
        // 完成上拉，等数据请求完成，要将新数据展示出来
        betterscroll.finishPullUp();
        // 刷新，重新计算高度
        nextTick(() => {
          // 刷新，重新计算高度
          betterscroll && betterscroll.refresh();
        });
      });
    });

    // 监听任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        // 刷新，重新计算高度
        betterscroll && betterscroll.refresh();
      });
    });

    return {
      title,
      activeMenu,
      categories,
      activeName,
      activeTab,
      handleSwtichTab,
      currentOrder,
      handleSelectMenu,
      currGoodsId,
      showGoods,
      isShowBackTop,
      backTop,
      handleJump,
    };
  },
};
</script>

<style lang="scss" scoped>
#category-main {
  margin-top: 45px;
  display: flex;
  .ordertab {
    flex: 1;
    width: calc(100% - 130px);
    height: 50px;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130;
    z-index: 9;
  }
  .leftmenu {
    width: 130px;
    position: fixed;
    top: 95px;
    left: 0px;
  }
  .goodslist {
    flex: 1;
    height: 100vh;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0px;
    padding: 10px;
    ::v-deep(.van-card__content) {
      text-align: left;
    }
    ::v-deep(.van-card__thumb) {
      width: 68px;
    }
  }
}
</style>
