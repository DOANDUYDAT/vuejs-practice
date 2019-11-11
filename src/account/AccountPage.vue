<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3">
        <v-list flat class="py-0">
          <v-list-group no-action :value="true" prepend-icon="mdi-account-circle" >
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
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>