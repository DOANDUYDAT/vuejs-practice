<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <slide-image-product :product="product"></slide-image-product>
      </v-col>
      <v-col cols="7">
        <info-order-product :product="product"></info-order-product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfoOrderProduct from './InfoOrderProduct';
import SlideImageProduct from './SlideImageProduct';
export default {
    components: {
        InfoOrderProduct,
        SlideImageProduct
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import "@/style.scss";

.container {
  background-color: $background-child;
}
</style>