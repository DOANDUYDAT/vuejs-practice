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
            <router-link to="/todo-app">Todo App</router-link>
          </v-col>
          <v-col>
            <router-link to="/shopping-cart-page">shopping cart page</router-link>
          </v-col>
          <v-col>
            <router-link to="/shopping-cart-page-2">shopping cart page 2</router-link>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row no-gutters>
          <v-col cols="2">
            <ul style="padding: 0;">
              <li style="list-style: none;" v-for="i in 10" :key="i">item {{ i }}</li>
            </ul>
          </v-col>
          <v-col cols="10">
            <template>
              <router-view></router-view>
              <router-view name="view1"></router-view>
              <router-view name="view2"></router-view>
              <router-view name="view3"></router-view>
            </template>
          </v-col>
        </v-row>
        <!-- If using vue-router -->
      </v-container>
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
      // alerts: [
      //   {
      //     type: "success",
      //     message: "alert success"
      //   },
      //   {
      //     type: "error",
      //     message: "alert error"
      //   }
      // ]
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
      alerts: state => state.alert.all
    }),
    // alertReverse() {
    //   return this.alerts.reverse()
    // }
  },
  methods: {
    clickBar: function() {
      console.log("thoa ngo");
    }
  }
};
</script>

<style lang="scss">
@import "./variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

h1 {
  text-align: center;
}
</style>