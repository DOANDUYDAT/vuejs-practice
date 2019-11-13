<template>
  <v-container>
    <rating-product :product="product"></rating-product>
    <div>{{ product }}</div>
    <div>{{ checkProductEmpty }}</div>
    <div>{{ checkProductEmptyMethod() }}</div>
  </v-container>
</template>

<script>
import RatingProduct from "@/review/RatingProduct";
import _ from "lodash";

export default {
  data: () => ({
    product: {}
  }),
  components: {
    RatingProduct
  },
  created() {
    // const productId = this.$route.params.product_id;
    const productId = 10;
    this.$store
      .dispatch("products/getProduct", { id: productId })
      .then(resolve => {
        this.product = resolve;
        console.log("pdp dispatch resolve" + resolve);
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    checkProductEmpty() {
      return _.isEmpty(this.product);
    }
  },
  methods: {
    checkProductEmptyMethod() {
      return _.isEmpty(this.product);
    }
  }
};
</script>