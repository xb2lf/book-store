<!--
 * @Author: {baixiao}
 * @Date: 2022-09-14 18:02:31
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 20:25:03
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
            v-model="name"
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
          <van-field
            v-model="password_confirmation"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            autocomplete="new-password"
            :rules="[{ required: true, message: '请填写一致密码' }]"
          />
          <van-field
            v-model="email"
            name="电子邮箱"
            label="电子邮箱"
            placeholder="电子邮箱"
            autocomplete="emial"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <div class="link-login" @click="handleJump">已有账号,立即登录</div>
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
import { Notify, Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, toRefs } from 'vue';
import NavBar from '@/components/common/navBar/NavBar.vue';
import logo from '@/assets/images/logo.webp';
import { userRegister } from 'network/user';
export default {
  name: 'Register',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = computed(() => route.meta.title);

    const userinfo = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

    const handleSubmit = () => {
      if (userinfo.password !== userinfo.password_confirmation) {
        Notify({ type: 'warning', message: '两次密码不一致' });
        return;
      }
      userRegister(userinfo)
        .then((res) => {
          if (res.status == '201') {
            Toast.success('注册成功');
            const timer = setTimeout(() => {
              router.push('/login');
              clearTimeout(timer);
            }, 1000);
          }
          userinfo.password = '';
          userinfo.password_confirmation = '';
        })
        .catch((err) => console.log(err));
    };

    const handleJump = () => {
      router.push('/login');
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
