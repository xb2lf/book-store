import { createStore } from 'vuex'
import mutations from './mutations';
import getters from './getters';
import actions from './actions';


const state = {
  user: {
    isLogin: window.localStorage.getItem('token'),
  },
  cartCount: 0,
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
