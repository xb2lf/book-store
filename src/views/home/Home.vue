<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 14:31:04
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 15:37:05
 * @Description: 
-->
<template>
  <div class="home-main">
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      :tabs="tabs"
      @changeIndex="changeIndex"
    ></tab-control>
    <div class="wrapper">
      <div class="content">
        <div ref="bannref">
          <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <tab-control :tabs="tabs" @changeIndex="changeIndex"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <back-top v-show="isShowBackTop" @backTop="backTop"></back-top>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, reactive, watchEffect, nextTick } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
import RecommendView from './ChildComps/RecommendView.vue';
import TabControl from '@/components/content/tabControl/TabControl.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';
import BackTop from '@/components/common/backtop/BackTop.vue';
import HomeSwiper from './ChildComps/HomeSwiper.vue';
import { getHomeAllData, getHomeGoods } from '@/network/home';
export default {
  name: 'Home',
  components: {
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
  },
  setup() {
    const route = useRoute();
    const title = computed(() => route.meta.title);
    const recommends = ref([]);
    const tabs = ref(['畅销', '新书', '精选']);
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
    });
    const currType = ref('sales');
    const showGoods = computed(() => {
      return goods[currType.value].list;
    });
    let betterscroll = reactive({});
    const isTabFixed = ref(false);
    const bannref = ref(null);
    const isShowBackTop = ref(false);
    const banners = ref([]);

    const changeIndex = (index) => {
      const types = ['sales', 'new', 'recommend'];
      currType.value = types[index];
      nextTick(() => {
        // 刷新，重新计算高度
        betterscroll && betterscroll.refresh();
      });
    };
    const backTop = () => {
      betterscroll.scrollTo(0, 0, 300);
    };

    onMounted(() => {
      getHomeAllData()
        .then((res) => {
          recommends.value = res.goods.data;
          banners.value = res.slides;
        })
        .catch((err) => {
          console.log(err);
        });
      getHomeGoods('sales')
        .then((res) => {
          goods.sales.list = res.goods.data;
        })
        .catch((err) => console.log(err));
      getHomeGoods('recommend')
        .then((res) => {
          goods.recommend.list = res.goods.data;
        })
        .catch((err) => console.log(err));
      getHomeGoods('new')
        .then((res) => {
          goods.new.list = res.goods.data;
        })
        .catch((err) => console.log(err));

      // 创建BetterScroll对象
      betterscroll = new BetterScroll(document.querySelector('.wrapper'), {
        probeType: 3, // 0,1,2,3 3只要在运用时就触发scroll事件
        click: true, // 是否允许点击
        pullUpLoad: true, // 上来加载更多，默认是false
      });
      // 触发滚动事件
      betterscroll.on('scroll', (position) => {
        console.log(position);
        isShowBackTop.value = isTabFixed.value =
          -position.y > bannref.value.offsetHeight;
      });
      // 上拉加载数据，触发pullingUp
      betterscroll.on('pullingUp', () => {
        const page = goods[currType.value].page + 1;
        getHomeGoods(currType.value, page)
          .then((res) => {
            goods[currType.value].list.push(...res.goods.data);
            goods[currType.value].page += 1;
          })
          .catch((err) => console.log(err));
        // 完成上拉，等数据请求完成，要将新数据展示出来
        betterscroll.finishPullUp();
        // 刷新，重新计算高度
        betterscroll && betterscroll.refresh();
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
      recommends,
      tabs,
      changeIndex,
      goods,
      showGoods,
      isTabFixed,
      bannref,
      isShowBackTop,
      backTop,
      banners,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-main {
  width: 100%;
  height: 100vh;
  position: relative;
  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
