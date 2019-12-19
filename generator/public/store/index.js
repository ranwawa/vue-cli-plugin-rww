/**
 * @author ZMN
 * @since 2019/11/6
 * @desc Vuex 入口
 * @remark
 */

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
});

export default store;
