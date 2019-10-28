import Vue from 'vue'

import router from './router'
import vuetify from '@/plugins/vuetify'

import store from './_store'
import App from './App'

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full';

// No 'extend' is needed

// Use the provider immediately
Vue.component('ValidationProvider', ValidationProvider);

/* eslint-disable no-new */

import { currency } from './currency'

Vue.filter('currency', currency)


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
  vuetify: vuetify,
  store: store
});

