<template>
  <v-app-bar app dark>
    <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
    </template>-->
    <v-container class="px-0">
      <v-row align="center" no-gutters>
        <v-col cols="3">
          <router-link to="/home">
          <v-avatar size="120">
            <v-img :src="require('@/_assets/image/logo.png')"></v-img>
          </v-avatar>
          </router-link>
        </v-col>
        <v-col cols="5">
          <search-box></search-box>
        </v-col>
        <v-spacer></v-spacer>
        <!-- <v-col cols="4"> -->
        <v-btn icon to="/home" exact>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <cart-dialog></cart-dialog>

        <v-menu v-if="loggedIn" open-on-hover bottom offset-y transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" depressed color="it-blue-lighten" to="/account/profile" exact>
              {{ fullName }}
              <v-icon right>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="/account/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item to="/account/orders">
              <v-list-item-title>Lịch sử đặt hàng</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin" v-if="isAdminPermission">
              <v-list-item-title>Trang quản trị</v-list-item-title>
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
        <!-- </v-col> -->
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import SearchBox from "./SearchBox";
import CartDialog from "./CartDialog";
import { userService } from "@/_api";
import { mapState, mapActions } from "vuex";
// import _ from "lodash";

export default {
  components: {
    LoginDialog,
    RegisterDialog,
    CartDialog,
    SearchBox
  },
  data() {
    return {
      userInfo: {}
    };
  },

  computed: {
    ...mapState({
      loggedIn: state => state.authentication.status.loggedIn,
      user: state => state.authentication.user
    }),
    fullName() {
      return this.userInfo.firstName + " " + this.userInfo.lastName;
    },
    isAdminPermission() {
      return  this.user.groups ? this.user.groups[0].name === "admin" || this.user.groups[0].name === 'staff' : false;
    }
  },
  methods: {
    ...mapActions({
      logoutAction: "authentication/logout",
      clearCart: 'cart/clearCart'
    }),
    async logout() {
      try {
        const isSuccess = await this.logoutAction();
        if (isSuccess) {
          this.clearCart();
          this.$store.dispatch("alert/success", {
            message: "You are log out!"
          });
          const currentPath = this.$route.path;
          if (currentPath !== "/home") {
            this.$router.push({ path: "/home" });
          }
        }
      } catch (error) {
        if (error.response) {
          this.$store.dispatch("alert/error", {
            message: error.response.data.detail
          });
        }
      }
    },
    goToHomePage() {
      // const currentPath = this.$route.path;
      // if (currentPath !== "/home") {
      this.$router.push({ path: "/home" });
      // }
    },
    async getData() {
      if (this.loggedIn) {
        console.log('getProfile');
        this.userInfo = await userService.getProfile();
      }
    }
  },
  created() {
    this.getData();
  },
  watch: {
    loggedIn: "getData"
  }
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>