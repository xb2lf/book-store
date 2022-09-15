/*
 * @Author: {baixiao}
 * @Date: 2022-09-14 21:14:24
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-14 22:34:26
 * @Description: 
 */

const mutations = {
  setIsLogin(state, payload) {
    state.user.isLogin = payload;
  },
  addCart(state, payload) {
    state.cartCount = payload.count;
  }
};

export default mutations
