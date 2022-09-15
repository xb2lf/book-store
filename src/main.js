/*
 * @Author: {baixiao}
 * @Date: 2022-09-13 12:26:25
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 17:46:39
 * @Description: 
 */
import { createApp } from 'vue'
import { Lazyload } from 'vant';
import App from './App.vue'
import router from './router'
import store from './store'

// Toast
import 'vant/es/toast/style';

// Dialog
import 'vant/es/dialog/style';

// Notify
import 'vant/es/notify/style';

// ImagePreview
import 'vant/es/image-preview/style';

createApp(App).use(store).use(router).use(Lazyload, {
  lazyComponent: true,
  loading: require('./assets/images/default.gif')
}).mount('#app')
