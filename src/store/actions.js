/*
 * @Author: {baixiao}
 * @Date: 2022-09-14 21:14:11
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 08:49:54
 * @Description: 
 */
import { getCart } from 'network/cart';

const actions = {
  updateCart({ commit }) {
    getCart().then(res => commit('addCart', { count: res.data.length || 0 })).catch(err => console.log(err))
  }
};

export default actions