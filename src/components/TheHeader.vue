<template>
  <v-app-bar color="blue" dark dense app>
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
    </template>

    <v-app-bar-nav-icon class="d-block d-sm-none"></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <template>
      <cart-dialog></cart-dialog>
    </template>
   
    <v-btn icon v-if="loginStatus" @click="logout">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>

    <!-- <template v-if="!loginStatus && $vuetify.breakpoint.smAndUp"> -->
    <login-dialog></login-dialog>
    <register-dialog></register-dialog>
    <!-- </template> -->

    <!-- <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>-->
  </v-app-bar>
</template>

<script>
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import CartDialog from "./CartDialog";

import { mapState } from "vuex";

export default {
  components: {
    LoginDialog,
    RegisterDialog,
    CartDialog
  },
  data() {
    return {};
  },

  computed: {
    ...mapState({
      loginStatus: state => state.login.loginStatus
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("login/logout");
    }
  }
};
</script>

