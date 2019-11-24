// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        background: '#EEEEEE',
        primary: '#3f51b5',
        button1: '#3f51b5',
        button2: '#f44336',
        error: '#f44336',
        warning: '#ffc107',
        success: '#4caf50',
      },
    },
  },
})