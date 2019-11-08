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
    <v-divider></v-divider>
    <suggest-product></suggest-product>
    <v-row>
      <v-col cols="12">
        <review-product></review-product>
      </v-col>
      <v-col cols="5">
        <spec-product-table :product="product"></spec-product-table>
      </v-col>
      <!-- <v-col cols="12"> -->

      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import SlideImageProduct from "./SlideImageProduct";
import SpecProductTable from "./SpecProductTable";
import InfoOrderProduct from "./InfoOrderProduct";
import ReviewProduct from "./ReviewProduct";

import SuggestProduct from "./SuggestProduct";
import { mapState } from "vuex";

export default {
  data() {
    return {
      // product: {}
    };
  },
  components: {
    SlideImageProduct,
    SpecProductTable,
    InfoOrderProduct,
    ReviewProduct,
    SuggestProduct
  },
  computed: {
    ...mapState({
      products: state => state.products.all
    }),
    product() {
      return this.products[0];
    }
  }
};
</script>

<style scoped>
.row {
  background-color: white;
  margin: 1rem 0;
}
</style>