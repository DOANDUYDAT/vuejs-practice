<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters class="grey lighten-5" style="height: 300px;">
          <v-card v-for="n in 3" :key="n" class="ma-3 pa-6" outlined tile>
            <p class="text-break">SUBDERMATOGLYPHIChellothoango</p>Column
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="6" md="2">
            <v-select label="Align"></v-select>
          </v-col>

          <v-col cols="6" md="2">
            <v-select label="Justify"></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn @click="loadData">loading</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered

      axios.get('http://it4421.pythonanywhere.com/products/')
    });
  },
  methods: {
    loadData: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
