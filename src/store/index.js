// import Vue from 'vue'
const Vue = require('vue')
const Vuex = require('vuex')
// import Vuex from 'vuex'

import state from './state.js';
import getters from './getter.js';
import mutations from './mutation.js';
import actions from './action.js';

Vue.use(Vuex)


const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})


export default store