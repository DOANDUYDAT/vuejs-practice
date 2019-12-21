<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="gg-red" dark >
    <v-app-bar-nav-icon @click.stop="changeDrawer" v-if="$vuetify.breakpoint.mdAndDown" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Trang quản trị</span>
    </v-toolbar-title>
    <v-text-field
      autocomplete="off"
      flat
      solo-inverted
      dark
      color="gg-red"
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer />
    <v-menu v-if="loggedIn" open-on-hover bottom offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" depressed color="gg-red" to="/account/profile" exact>
          {{ fullName }}
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/account/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/home">
          <v-list-item-title>Trang chủ</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { userService } from "@/_api";
import { mapState, mapActions } from "vuex";
// import _ from "lodash";

export default {
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
    }
  },
  methods: {
    ...mapActions({
      logoutAction: "authentication/logout"
    }),
    async logout() {
      try {
        const isSuccess = await this.logoutAction();
        if (isSuccess) {
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
            message: error.response.data.message
          });
        }
      }
    },
    async getData() {
      this.userInfo = await userService.getProfile();
    },
    changeDrawer() {
      this.$store.dispatch("navigator/changeDrawer", { value: true });
    }
  },
  created() {
    this.getData();
  }
};
</script>