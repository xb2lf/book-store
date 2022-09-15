<!--
 * @Author: {baixiao}
 * @Date: 2022-09-15 09:57:04
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 16:07:02
 * @Description: 
-->
<template>
  <div class="order-box">
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <van-tabs ref="tabs" @click="handleChangeTab" class="order-tab">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="发货"></van-tab>
      <van-tab title="交易完成"></van-tab>
      <van-tab title="过期"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="handleRefresh"
        class="order-list-refresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoad"
          @offset="10"
        >
          <div
            @click="handleGoTo(item.id)"
            class="order-item-box"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="order-item-header">
              <span style="line-height: 30px"
                >订单号：{{ item.order_no }} <br />
                创建时间：{{ item.created_at }}</span
              >
            </div>
            <van-card
              v-for="sub in item.orderDetails.data"
              :key="sub.id"
              :num="sub.num"
              :price="sub.goods.price"
              desc="全场包邮"
              :title="sub.goods.title"
              :thumb="sub.goods.cover_url"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
/* 
  List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可
 */
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, toRefs, onMounted, computed } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
import { getOrderList } from '@/network/order';
export default {
  name: 'Order',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = computed(() => route.meta.title);
    const tabs = ref(null);
    const state = reactive({
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0,
      status: 0,
    });

    // 多次加载
    const loadData = () => {
      // 请求订单数据
      getOrderList({
        page: state.page, // 当前是那一页的参数
        status: state.status, // 订单状态 1下单 2支付 3发货 4收货 5过期
        include: 'orderDetails.goods', // 订单详情（包含商品信息)
      }).then((res) => {
        // 重新加载订单列表
        state.list = state.list.concat(res.data);
        state.loading = false;
        // 接口中的页数传递给变量总页数
        state.totalPage = res.meta.pagination.total_pages;
        // 如果总页数等于当前页
        if (state.page >= state.totalPage) {
          state.finished = true;
        }
      });
    };
    // 初始化数据
    const handleLoad = () => {
      // 如果当前页小于总页数的时候
      if (!state.refreshing && state.page < state.totalPage) {
        // 加载的时候 当前页面等于当前页面+1
        state.page = state.page + 1;
      }
      // 如果state下面的refreshing加载状态为真的话
      if (state.refreshing) {
        // list为空
        state.list = [];
        // 加载状态设置成假
        state.refreshing = false;
      }

      loadData();
    };

    const handleRefresh = () => {
      // 是否处于加载状态，加载过程中不触发load事件
      state.refreshing = true;
      // 清空列表数据
      state.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      // 页面初始化为 1
      state.page = 1;

      handleLoad();
    };

    // tab 切换
    const handleChangeTab = (name) => {
      // 状态改变
      state.status = name;
      handleRefresh();
    };

    // 到订单详情页
    const handleGoTo = (id) => {
      router.push({ path: '/orderdetail', query: { id } });
    };

    onMounted(() => {
      handleRefresh(); // 初始化
    });

    return {
      title,
      ...toRefs(state),
      handleLoad,
      handleRefresh,
      tabs,
      handleChangeTab,
      handleGoTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.order-box {
  text-align: left;
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .order-name {
      font-size: 14px;
    }
  }
  .order-tab {
    margin-top: 44px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }

  .content {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    padding-top: 100px;
  }
  .order-list-refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }

    .order-item-box {
      margin: 20px 10px;
      background-color: #fafafa;
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #ffffff;
        border-radius: 3px;
        margin-top: 10px;
      }
    }
  }
}
</style>
