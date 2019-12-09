<template>
  <!-- App.vue -->
  <v-app>
    <the-header></the-header>
    <!-- Sizes your content based upon application components -->
    <!-- <alert v-for="(alert, id) in alerts" :key="id" :alert="alert"></alert> -->

    <v-content>
      <!-- Provides the application the proper gutter -->
      <alert-list></alert-list>

      <!-- <transition name="fade" mode="out-in"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-content>

    <scroll-button></scroll-button>
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import AlertList from "@/components/AlertList";
import ScrollButton from "@/components/ScrollButton";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },

  components: {
    TheHeader,
    TheFooter,
    AlertList,
    ScrollButton
  },
  computed: {},

  methods: {},
  created() {
    this.$store
      .dispatch("products/getAllProducts")
      .then(resolve => {
        // console.log("app dispatch resolve: " + resolve);
      })
      .catch(error =>
        this.$store.dispatch("alert/error", {
          message: error
        })
      );
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.v-application {
  background-color: $it-bg-out;
}
</style>
