<!--
 * @Author: {baixiao}
 * @Date: 2022-09-14 18:07:36
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 21:43:23
 * @Description: 
-->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <div class="register-main">
      <div class="register-logo">
        <van-image width="100" height="100" lazy-load :src="logo" />
      </div>
      <van-form @submit="handleSubmit">
        <van-cell-group inset>
          <van-field
            v-model="email"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            autocomplete="username"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            autocomplete="new-password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <div class="link-login" @click="handleJump">没有账号,立即注册</div>
          <van-button
            round
            block
            type="info"
            color="#44b883"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive, toRefs } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
import logo from '@/assets/images/logo.webp';
import { userLogin } from 'network/user';
export default {
  name: 'Login',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const title = computed(() => route.meta.title);

    const userinfo = reactive({
      email: '',
      password: '',
    });

    const handleSubmit = () => {
      userLogin(userinfo)
        .then((res) => {
          if (res.access_token) {
            window.localStorage.setItem('token', res.access_token);
            store.commit('setIsLogin', true);
            Toast.success('登录成功');
            userinfo.email = '';
            userinfo.password = '';
            const timer = setTimeout(() => {
              router.go(-1);
              clearTimeout(timer);
            }, 500);
          }
        })
        .catch((err) => console.log(err));
    };

    const handleJump = () => {
      router.push('/register');
    };

    return {
      title,
      logo,
      ...toRefs(userinfo),
      handleSubmit,
      handleJump,
    };
  },
};
</script>

<style lang="scss" scoped>
.register-main {
  margin-top: 50px;
  .register-logo {
    text-align: center;
    padding-top: 30px;
  }
  .link-login {
    font-size: 14px;
    margin-bottom: 20px;
    color: #42b983;
    display: inline-block;
  }
}
</style>
