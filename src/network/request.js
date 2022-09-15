/*
 * @Author: {baixiao}
 * @Date: 2022-09-13 13:42:50
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 21:12:10
 * @Description: 
 */
import axios from 'axios';
import { Notify, Toast } from 'vant';
import router from '../router';

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000,
  });

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 如果有一个接口需要认证才可以访问，就在这里统一设置
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config
    },
    error => {
      throw new Error(error.message)
    });

  // 响应拦截
  instance.interceptors.response.use(response => {
    // Do something before response is sent
    console.log(response);
    return response.data ? response.data : response;
  }, error => {
    // 如果有需要授权才可以访问的接口，统一去login授权
    if (error.response.status == '401') {
      Toast.fail('请先登录');
      const timer = setTimeout(() => {
        router.push({ path: '/login' });
        clearTimeout(timer);
      }, 500)

      return
    }
    // 如果有错误，这里会处理，显示错误信息
    Notify({ type: 'warning', message: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] });
    return Promise.reject(error);
  });

  return instance(config);
}