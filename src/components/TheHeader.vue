<template>
  <v-app-bar
    color="#fcb69f"
    dark
    :shrink-on-scroll="$vuetify.breakpoint.smAndUp"
    :dense="$vuetify.breakpoint.smAndDown"
    src="https://picsum.photos/1920/1080?random"
    app
    
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
    </template>

    <v-app-bar-nav-icon class="d-block d-sm-none"></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-cart-plus</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>

    

    <!-- <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
 
  computed: {
    
  }, 
  methods: {
  
  }
};
</script>

