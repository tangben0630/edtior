// import Vue from 'vue'
const Vue = require('vue')
import App from './App.vue'
import store from './store/index';
import httpRequest from './assets/js/http'
// import vuescroll from 'vuescroll';
// import 'vuescroll/dist/vuescroll.css';
import './assets/scss/reset.scss'
import './assets/scss/public.scss'
// import ElementUI from 'element-ui';

// Vue.use(vuescroll);
// Vue.use(ElementUI);

Vue.mixin({
  created () {

  },
})
Vue.prototype.axios = httpRequest

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
