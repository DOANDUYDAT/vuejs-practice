<template>
  <!-- App.vue -->
  <v-app>
    <the-header></the-header>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->

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
        <v-row>
          <v-col cols="2">
            <ul>
              <li v-for="i in 10" :key="i"> item {{ i }}</li>
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

export default {
  data() {
    return {};
  },

  components: {
    TodoList,
    TheHeader,
    TheFooter
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