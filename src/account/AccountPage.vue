<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3">
        <v-list flat>
          <v-list-group :value="true">
            <template v-slot:activator>
              <v-list-item-title>Account</v-list-item-title>
            </template>
            <v-list-item to="/account/profile">
              <!-- <router-link to="/account/profile">Profile</router-link> -->
              Profile
            </v-list-item>
            <v-list-item to="/account/change-password">
              <!-- <router-link >Đổi mật khẩu</router-link> -->
              Đổi mật khẩu
            </v-list-item>
            <v-list-item to="/account/history">
              <!-- <router-link >Lịch sử mua hàng</router-link> -->
              Lịch sử mua hàng
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