<template>
  <v-carousel cycle height="350" show-arrows-on-hover hide-delimiter-background>
    <v-carousel-item
      v-for="product in topProduct"
      :key="product.id"
      :src="product.images.length ? product.images[0].image : ''"
      contain
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    topProduct: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>