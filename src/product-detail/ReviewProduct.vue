<template>
  <div>
    <rating-product :product="product"></rating-product>
    <review-list></review-list>
  </div>
</template>

<script>
import ReviewList from "./ReviewList";
import RatingProduct from "./RatingProduct";

import { mapState } from "vuex";

export default {
  components: {
    ReviewList,
    RatingProduct
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