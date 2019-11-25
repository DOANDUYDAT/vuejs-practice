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
        "gg-blue": "#2793F2",
        "gg-green": "#03A63C",
        "gg-orange": "#F29F05",
        "gg-red": "#F22727",
        "gg-grey": "#F2F2F2"
      },
    },
  },
})