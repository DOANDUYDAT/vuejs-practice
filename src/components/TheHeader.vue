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
    <!-- <template> -->
    <cart-dialog></cart-dialog>
    <!-- </template> -->

    <v-menu v-if="loggedIn" open-on-hover bottom offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on"  depressed color='blue'>
          <v-icon left>mdi-account-circle </v-icon>User Name
          
        </v-btn>
        
      </template>

      <v-list>
        <v-list-item to="/account/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/account/history">
          <v-list-item-title>Lịch sử đặt hàng</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- <v-btn icon @click="logout">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>-->

    <!-- <template v-if="!loginStatus && $vuetify.breakpoint.smAndUp"> -->
    <template v-if="!loggedIn">
      <login-dialog></login-dialog>
      <register-dialog></register-dialog>
    </template>

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
    return {
      
    };
  },

  computed: {
    ...mapState({
      loggedIn: state => state.authentication.status.loggedIn
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("authentication/logout");
    }
  }
};
</script>

