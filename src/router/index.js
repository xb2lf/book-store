/*
 * @Author: {baixiao}
 * @Date: 2022-09-13 12:26:25
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 14:00:17
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import { Notify } from 'vant';
import store from '@/store';

const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const Detail = () => import('../views/detail/Detail.vue');
const ShopCart = () => import('../views/shopcart/ShopCart.vue');
const ProFile = () => import('../views/profile/ProFile.vue');
const Register = () => import('../views/profile/Register.vue');
const Login = () => import('../views/profile/Login.vue');
const About = () => import('../views/about/About.vue');
const Collect = () => import('../views/profile/Collect.vue');
const Order = () => import('../views/order/Order.vue');
const CreateOrder = () => import('../views/order/CreateOrder.vue');
const OrederDetail = () => import('../views/order/OrderDetail.vue');
const Setting = () => import('../views/profile/Setting.vue');
const Address = () => import('../views/profile/Address.vue');
const AddressEdit = () => import('../views/profile/AddressEdit.vue');
const NotFound = () => import('../views/notfound/NotFound.vue');

const routes = [
  {
    path: '/',
    name: 'defaultHome',
    component: Home,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      title: '分类',
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
    meta: {
      title: '商品详情',
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart,
    meta: {
      title: '购物车',
      isAuthRequired: true,
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProFile,
    meta: {
      title: '个人中心',
      isAuthRequired: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '用户注册',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '用户登录',
    }
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect,
    meta: {
      title: '我的收藏'
    },
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      title: '我的订单',
    },
  },
  {
    path: '/createorder',
    name: 'createorder',
    component: CreateOrder,
    meta: {
      title: '订单预览',
    },
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: OrederDetail,
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: {
      title: '账号管理'
    },
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
    meta: {
      title: '地址管理',
    },
  },
  {
    path: '/addressedit',
    name: 'addressedit',
    component: AddressEdit,
    meta: {
      title: '地址编辑',
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于我们",
    },
  },
  // 使用正则的方式,匹配任意的,404 Notfound 路由
  {
    path: "/:path(.*)",
    component: NotFound,
    meta: {
      title: '404未找到'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // 如果没有登录，在这里跳转登录
  if (to.meta.isAuthRequired && !store.state.user.isLogin) {
    Notify({ type: 'warning', message: '您还没有登录,请先登录' });
    return next('/login');
  } else {
    next();
  }
  document.title = to.meta.title;
})

export default router
