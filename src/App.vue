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
            <router-link to="/home">Home</router-link>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
        <router-view name="view1"></router-view>
        <router-view name="view2"></router-view>
        <router-view name="view3"></router-view>
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
  data(){
    return {
      
    }
  },
  
  components: {
    TodoList,
    TheHeader,
    TheFooter
  },
  methods: {
    clickBar: function() {
      console.log("thoa ngo");
    },
    
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