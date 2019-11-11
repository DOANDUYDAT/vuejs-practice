<template>
  <v-container>
    <router-link to="/todo/profile">Profile</router-link>
    <router-link to="/todo/change">Profile</router-link>
    <router-link to="/todo/history">Profile</router-link>
    <router-view></router-view>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>