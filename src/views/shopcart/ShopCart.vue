<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 14:35:41
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 09:26:49
 * @Description: 
-->
<template>
  <div>
    <nav-bar>
      <template v-slot:default
        >{{ title }}(<span style="color: red">{{ $store.state.cartCount }}</span
        >)</template
      >
    </nav-bar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group
          ref="checkboxGroup"
          v-model="result"
          @change="handleGroupChange"
        >
          <van-swipe-cell
            :right-width="50"
            :key="index"
            v-for="(item, index) in list"
          >
            <div class="good-item">
              <!--选中购物车中商品的ID-->
              <van-checkbox :name="item.id" />
              <div class="good-img">
                <img :src="item.goods.cover_url" />
              </div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <span>仅剩:{{ item.goods.stock }}</span>
                </div>
                <div class="good-btn">
                  <div class="price">
                    <small>￥</small>{{ `${item.goods.price}.00` }}
                  </div>
                  <van-stepper
                    integer
                    :min="1"
                    :max="item.goods.stock"
                    :model-value="item.num"
                    :name="item.id"
                    async-change
                    @change="handleChange"
                  />
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="handleDeleteGood(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar
        class="submit-all"
        :price="total * 100"
        @submit="handleSubmit"
        button-text="结算"
      >
        <van-checkbox @change="handleCheckAll" v-model="checkAll"
          >全选</van-checkbox
        >
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img
          class="empty-cart"
          src="~assets/images/empty-car.png"
          alt="空购物车"
        />
        <div class="title">购物车空空如也</div>
        <van-button
          round
          color="#1baeae"
          type="primary"
          block
          @click="handleGoHome"
          >前往选购</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavBar from '@/components/common/navBar/NavBar.vue';
import { getCart, modifyCart, checkedyCart, deleteCart } from 'network/cart';
export default {
  name: 'ShopCart',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const title = computed(() => route.meta.title);
    const state = reactive({
      list: [],
      result: [], // 选中的id 数组
      checkAll: false,
    });

    const total = computed(() => {
      let sum = 0;
      state.list
        .filter((item) => state.result.includes(item.id))
        .forEach((item) => {
          sum += parseInt(item.num) * parseFloat(item.goods.price);
        });
      return sum;
    });

    const init = () => {
      Toast.loading({ message: '加载中...', forbidClick: true });
      getCart('include=goods').then((res) => {
        Toast.clear();
        state.list = res.data;
        state.result = res.data
          .filter((n) => n.is_checked == 1)
          .map((item) => item.id);
        state.checkAll = res.data.every((item) => item.is_checked == 1);
      });
    };

    const handleGoHome = () => {
      router.push('/home');
    };

    const handleGroupChange = (result) => {
      Toast.loading({ message: '加载中...', forbidClick: true });
      state.checkAll = result.length === state.list.length;
      state.result = result;
      checkedyCart({ cart_ids: result }).then((res) => {
        if (res.status == '204') {
          Toast.clear();
        }
      });
    };

    const handleChange = (value, detail) => {
      Toast.loading({ message: '加载中...', forbidClick: true });
      modifyCart(detail.name, { num: value }).then((res) => {
        Toast.clear();
        if (res.status == '204') {
          state.list.forEach((item) => {
            if (item.id === detail.name) {
              item.num = value;
            }
          });
          Toast.clear();
        }
      });
    };

    const handleCheckAll = (checked) => {
      Toast.loading({ message: '加载中...', forbidClick: true });
      state.checkAll = checked;
      if (checked) {
        state.result = state.list.map((item) => item.id);
      } else {
        state.result = [];
      }
      checkedyCart({ cart_ids: state.result }).then((res) => {
        if (res.status == '204') {
          Toast.clear();
        }
      });
    };

    const handleDeleteGood = (id) => {
      deleteCart(id).then((res) => {
        if (res.status == '204') {
          init();
          store.dispatch('updateCart');
        }
      });
    };

    const handleSubmit = () => {
      if (!state.result.length) {
        Toast.fail('请选择商品进行结算');
        return;
      }
      router.push({ path: '/createorder' });
    };

    onMounted(() => {
      init();
    });

    return {
      title,
      ...toRefs(state),
      total,
      handleGoHome,
      handleGroupChange,
      handleChange,
      handleCheckAll,
      handleDeleteGood,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          width: 100px;
          height: auto;
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 0px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: red;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: red;
    border-color: red;
  }
}
</style>
