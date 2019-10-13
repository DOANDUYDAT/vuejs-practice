import Vue from 'vue';

import router from './router';
import vuetify from '@/plugins/vuetify';


import App from './App';


// Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
  vuetify: vuetify
});

