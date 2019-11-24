<template>
  <v-container>
    <div class="headline mb-2">
      <v-icon color="amber" class="mr-2">mdi-star-outline</v-icon>Đánh giá sản phẩm
    </div>

    <rating-product :product="product"></rating-product>
    <review-list></review-list>
  </v-container>
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
    // ...mapState({
    //   products: state => state.products.all
    // }),
    // product() {
    //   return this.products[0];
    // }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log("ReviewProduct mounted");
  },
  updated() {
    console.log("ReviewProduct updated");
  }
};
</script>

<style lang="scss" scoped>
@import "@/style.scss";
.container {
  background-color: $background-child;
}
</style>