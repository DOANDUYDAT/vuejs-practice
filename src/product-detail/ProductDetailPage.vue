<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="5">
        <slide-image-product :product="product"></slide-image-product>
      </v-col>
      <v-col cols="7">
        <info-order-product :product="product"></info-order-product>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <suggest-product :product="product"></suggest-product>
    <v-row>
      <v-col cols="10">
        <review-product :product="product"></review-product>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <spec-product-table :product="product"></spec-product-table>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="10">
        <comment-product></comment-product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SlideImageProduct from "./SlideImageProduct";
import SpecProductTable from "./SpecProductTable";
import InfoOrderProduct from "./InfoOrderProduct";
import ReviewProduct from "@/review/ReviewProduct";
import SuggestProduct from "./SuggestProduct";
import CommentProduct from "@/comment/CommentProduct";
import { mapState } from "vuex";

export default {
  data() {
    return {
      product: {}
    };
  },
  components: {
    SlideImageProduct,
    SpecProductTable,
    InfoOrderProduct,
    ReviewProduct,
    SuggestProduct,
    CommentProduct
  },
  computed: {
    // ...mapState({
    //   products: state => state.products.all
    //   // product: state => state.products.product
    // })
    // product() {
    //   return this.products[0];
    // }
  },
  created() {
    // this.getProduct()
    console.log("pdp created ");
    this.getProduct()
    // this.product = this.products[productId];

    // console.log("pdp created products: " + this.products);
    // console.log("pdp created product: " + JSON.stringify(this.product));
  },
  mounted() {
    console.log("ProductDetailPage mounted: ");
    // console.log("pdp mounted products: " + this.products);
    // console.log("pdp mounted product: " + JSON.stringify(this.product));
  },
  updated() {
    console.log("ProductDetailPage updated: ");
  },
  watch: {
    // call again the method if the route changes
    // $route(to, from) {
    //   const productId = this.$route.params.product_id;
    //   console.log("$route: " + productId);
    //   this.product = this.products[productId];
    // }
    $route: 'getProduct'
  },

  methods: {
    getProduct() {
      const productId = this.$route.params.product_id;
      this.$store
        .dispatch("products/getProduct", { id: productId })
        .then(resolve => {
          console.log(resolve.images)
          this.product = Object.assign({}, this.product, resolve);
          console.log("pdp dispatch resolve" + resolve);
        })
        .catch(error => {
          console.log(error);
        });
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