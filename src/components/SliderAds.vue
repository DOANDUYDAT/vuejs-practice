<template>
  <v-carousel height="350" hide-delimiters>
    <v-carousel-item v-for="product in topProduct" :key="product.id" :src="product.url">
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    topProduct: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>