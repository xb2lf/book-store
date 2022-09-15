<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 14:35:11
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 09:44:04
 * @Description: 
-->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img :src="avatar" />
          <div class="user-desc">
            <span>昵称：{{ user.name }}</span>
            <span>登录名：{{ user.email }}</span>
            <span class="name">个性签名：机会只留给有准备的人</span>
          </div>
        </div>
      </div>

      <ul class="user-list">
        <li class="van-hairline--bottom" @click="handleGoTo('/collect')">
          <span>我的收藏</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="handleGoTo('/order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="handleGoTo('/setting')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="handleGoTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="handleGoTo('/about')">
          <span>关于我们</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <div class="logout">
      <van-button
        type="primary"
        @click="handleLogout"
        color="#44b883"
        round
        block
        >退出</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, toRefs, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import NavBar from '@/components/common/navBar/NavBar.vue';
import { userLogin, getUser } from 'network/user';
import userDefault from '@/assets/images/user-default.jpg';
export default {
  name: 'ProFile',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const title = computed(() => route.meta.title);

    const state = reactive({
      user: {},
    });
    const avatar = ref('');

    const handleGoTo = (path, query) => {
      router.push({ path, query: query || {} });
    };

    const handleLogout = () => {
      userLogin()
        .then((res) => {
          if (res.status == '204') {
            Toast.success('退出成功');
            window.localStorage.setItem('token', '');
            store.commit('setIsLogin', false);
            const timer = setTimeout(() => {
              router.push('/login');
              clearTimeout(timer);
            }, 500);
          }
        })
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      getUser().then((res) => {
        state.user = res;
        avatar.value = res.avatar_url ? res.avatar_url : userDefault;
      });
    });

    return {
      title,
      ...toRefs(state),
      avatar,
      handleGoTo,
      handleLogout,
    };
  },
};
</script>

<style lang="scss" scoped>
#box {
  background: #fcfcfc;
  height: 100vh;
}
.user-box {
  margin-top: 65px;
  .user-header {
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
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, #31c7a7, #a1c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    text-align: left;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 8px;
    margin-top: 40px;
    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
      margin: 20px 0 !important;
      background: #ffffff;
      border-radius: 3px;
    }
  }
}
.logout {
  margin: 16px;
}
</style>
