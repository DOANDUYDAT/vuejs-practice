<template>
  <v-container v-if="product">
    <breadcrumb-base></breadcrumb-base>
    <v-row>
      <v-col cols="12">
        <product-info :product="product"></product-info>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <suggest-product :product="product"></suggest-product>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8"></v-col>
      <v-col cols="4">
        <spec-product-table :product="product"></spec-product-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <review-product :product="product"></review-product>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <comment-product></comment-product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductInfo from "./ProductInfo";
import SpecProductTable from "./SpecProductTable";
import ReviewProduct from "@/review/ReviewProduct";
import SuggestProduct from "./SuggestProduct";
import CommentProduct from "@/comment/CommentProduct";
import BreadcrumbBase from "@/components/BreadcrumbBase";
import { productService } from "@/_api";

export default {
  data() {
    return {
      product: {}
    };
  },
  components: {
    SpecProductTable,
    ProductInfo,
    ReviewProduct,
    SuggestProduct,
    CommentProduct,
    BreadcrumbBase
  },
  computed: {},
  created() {
    this.getData();
  },

  watch: {
    // call again the method if the route changes
    // $route(to, from) {
    //   const productId = this.$route.params.product_id;
    //   console.log("$route: " + productId);
    //   this.product = this.products[productId];
    // }
    $route: "getData"
  },

  methods: {
    async getData() {
      const productId = this.$route.params.productId;
      this.product = await productService.getProduct(productId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.product-info {
  background-color: $it-bg-in;
}
</style>