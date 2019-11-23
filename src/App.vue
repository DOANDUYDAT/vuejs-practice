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
            <router-link to="/account">account</router-link>
          </v-col>
        </v-row>
        <!-- <v-btn @click="clickBar">click</v-btn> -->
      </v-container>
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-content>

    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
import AlertList from "./components/AlertList";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      // transitionName: "slide-left"
      product: {}
    };
  },

  components: {
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
    // clickBar: function() {
    //   this.product = this.products[0];
    //   console.log(this.product)
    // },
    // ...mapMutations({
    //   setDataForVuex: 'products/setProducts'
    // })
  },
  created() {
    console.log("app created");
    // this.product = null
    this.$store
      .dispatch("products/getAllProducts")
      .then(resolve => {
        console.log("app dispatch resolve: " + resolve);
      })
      .catch(error => console.log("app dispatch reject: " + error));

    // this.product = this.products[0];
    // console.log('app created products: ' + this.products);
    // console.log('app created product: ' + JSON.stringify(this.product));
  },
  mounted() {
    console.log("app mounted ");
    // console.log('app mounted products: ' + this.products);
    // console.log('app mounted product: ' + JSON.stringify(this.product));
  },
  updated() {
    //   console.log('app updated products: ' + this.products);
    //   console.log('app updated product: ' + JSON.stringify(this.product));
  }
};
</script>

<style scoped></style>
