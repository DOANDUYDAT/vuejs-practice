<template>
  <v-app-bar color="gg-green" dark app>
    <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)" ></v-img>
    </template> -->

    <v-app-bar-nav-icon class="d-block d-sm-none"></v-app-bar-nav-icon>

    <v-toolbar-title>BK Mobile</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <search-box></search-box>

    <v-btn icon to="/home" exact>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <cart-dialog></cart-dialog>

    <v-menu v-if="loggedIn" open-on-hover bottom offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" depressed color="gg-green" to="/account/profile" exact>
          {{ fullName }}
          <v-icon right>mdi-account-circle</v-icon>
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
import SearchBox from "./SearchBox";
import CartDialog from "./CartDialog";
import { userService } from "@/_api";
import { mapState, mapActions } from "vuex";
import _ from "lodash";

export default {
  components: {
    LoginDialog,
    RegisterDialog,
    CartDialog,
    SearchBox
  },
  data() {
    return {};
  },

  computed: {
    ...mapState({
      loggedIn: state => state.authentication.status.loggedIn,
      user: state => state.authentication.user
    }),
    fullName() {
      return this.user.username;
    }
  },
  methods: {
    ...mapActions({
      logoutAction: "authentication/logout"
    }),
    logout() {
      this.logoutAction();
      // const fullPath = this.$route.query.redirect
      //   ? this.$route.query.redirect
      //   : this.$route.path;
      const currentPath = this.$route.path;
      if (currentPath !== "/home") {
        this.$router.push({ path: "/home" });
      }
    },
    goToHomePage() {
      // const currentPath = this.$route.path;
      // if (currentPath !== "/home") {
      this.$router.push({ path: "/home" });
      // }
    }
  }
};
</script>

