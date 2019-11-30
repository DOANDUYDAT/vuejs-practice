<template>
  <v-app>
    <the-navigator :drawer="drawer"></the-navigator>
    <the-header @changeDrawer="drawer = !drawer"></the-header>
    <v-content>
      <breadcrumb-base></breadcrumb-base>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheNavigator from "./components/TheNavigator";
import TheHeader from "./components/TheHeader";
import BreadcrumbBase from "@/components/BreadcrumbBase";

export default {
  data() {
    return {
      drawer: true
    }
  },
  components: {
    TheNavigator,
    TheHeader,
    BreadcrumbBase
  },
  created() {
    this.$store
      .dispatch("products/getAllProducts")
      .then(resolve => {
        console.log("app dispatch resolve: " + resolve);
      })
      .catch(error => console.log("app dispatch reject: " + error));
  }
};
</script>