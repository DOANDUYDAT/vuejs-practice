<template>
  <v-btn v-show="showButton" fab bottom right fixed dark color="red" @click="scrollToTop" v-scroll="onScroll">
    <v-icon x-large>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
        offset: 0,
    };
  },
  computed: {
      showButton() {
          return this.offset > 100;
        
      }
  },
  methods: {
    scrollToTop() {
      const target = 0;
      const options = {
        duration: 500,
        offset: 0,
        easing: "linear"
      };
      // vị trí bằng target - options.offset
      this.$vuetify.goTo(target, options);
    },
    onScroll() {
        this.offset = Math.floor(window.pageYOffset);
    },
   
  },
  
};
</script>