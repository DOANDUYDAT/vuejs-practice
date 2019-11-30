<template>
  <v-container>
    <breadcrumb-base></breadcrumb-base>
    <v-row no-gutters>
      <v-col cols="3">
        <v-list flat class="py-0">
          <v-list-group no-action :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>Account</v-list-item-title>
            </template>
            <v-list-item to="/account/profile" exact>
              <v-list-item-content>Profile</v-list-item-content>
            </v-list-item>
            <v-list-item to="/account/change-password" exact>
              <v-list-item-content>Đổi mật khẩu</v-list-item-content>
            </v-list-item>
            <v-list-item to="/account/history" exact>
              <v-list-item-content>Lịch sử mua hàng</v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col cols="9">
        <!-- <transition :name="transitionName"> -->
          <router-view></router-view>
        <!-- </transition> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import BreadcrumbBase from '@/components/BreadcrumbBase';
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  components: {
    BreadcrumbBase
  }
  // beforeRouteUpdate(to, from, next) {
  //   const toDepth = to.path.split("/").length;
  //   const fromDepth = from.path.split("/").length;
  //   this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  //   next();
  // }
};
</script>