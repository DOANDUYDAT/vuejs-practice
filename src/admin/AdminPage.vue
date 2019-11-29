<template>
  <v-app>
    <the-navigator></the-navigator>
    <the-header></the-header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheNavigator from './components/TheNavigator'
import TheHeader from './components/TheHeader';

export default {
  components: {
    TheNavigator,
    TheHeader
  },
  created() {
    this.$store
      .dispatch("products/getAllProducts")
      .then(resolve => {
        console.log("app dispatch resolve: " + resolve);
      })
      .catch(error => console.log("app dispatch reject: " + error));
    
  },
};
</script>