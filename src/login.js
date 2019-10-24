import Vue from 'vue'


import vuetify from '@/plugins/vuetify'

import Login from './components/Login'



// Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<Login />',
  components: { Login },

  vuetify: vuetify,
 
});

