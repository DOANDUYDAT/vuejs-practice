import Vue from 'vue'


import vuetify from '@/plugins/vuetify'

import Login from './components/Login'



import { ValidationProvider } from 'vee-validate/dist/vee-validate.full';

// No 'extend' is needed

// Use the provider immediately
Vue.component('ValidationProvider', ValidationProvider);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<Login />',
  components: { Login },

  vuetify: vuetify,
 
});

