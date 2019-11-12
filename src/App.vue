<template>
  <!-- App.vue -->
  <v-app>
    <the-header></the-header>
    <!-- Sizes your content based upon application components -->
    <!-- <alert v-for="(alert, id) in alerts" :key="id" :alert="alert"></alert> -->

    <v-content>
      <!-- Provides the application the proper gutter -->
      <alert-list></alert-list>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <router-link to="/">Home</router-link>
          </v-col>
          <v-col>
            <router-link to="/todo">Todo App</router-link>
          </v-col>
          <v-col>
            <router-link to="/shopping-cart-page">shopping cart page</router-link>
          </v-col>
          <v-col>
            <router-link to="/product-detail-page">Product detail</router-link>
          </v-col>
          <v-col>
            <router-link to="/account">account</router-link>
          </v-col>
        </v-row>
        <v-btn @click="clickBar">click</v-btn>
      </v-container>
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-content>

    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TodoList from "./components/TodoList";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
import AlertList from "./components/AlertList";

import { mapState } from "vuex";

export default {
  data() {
    return {
      // transitionName: "slide-left"
    };
  },

  components: {
    TodoList,
    TheHeader,
    TheFooter,
    AlertList
  },
  computed: {
    ...mapState({
      alerts: state => state.alert.all,
      loggedIn: state => state.authentication.status.loggedIn,
      products: state => state.products.all
    })
    // alertReverse() {
    //   return this.alerts.reverse()
    // }
  },

  methods: {
    clickBar: function() {
      console.log(this.products);
    }
  },
  created() {
    this.$store.dispatch("products/getAllProducts");
  }
};
</script>

<style scoped>
</style>