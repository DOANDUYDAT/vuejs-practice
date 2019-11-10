<template>
  <v-container>
    <slider-ads :topProduct="topProduct"></slider-ads>
    <v-row no-gutters>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <product-list-item :product="product"></product-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import ProductListItem from "./ProductListItem";
import SliderAds from "./SliderAds";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    ProductListItem,
    SliderAds
  },
  data() {
    return {};
  },
  computed: {
    topProduct() {
      let topProduct = [];
      // Lấy 5 sản phẩm mới nhất
      if (this.products.length > 0) {
        for (let i = 0; i < 5; i++) {
          topProduct.push(this.products[i]);
        }
      }
      // console.log(topProduct);
      return topProduct;
    },
    ...mapState({
      products: state => state.products.all
    })
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    
  },
  created() {
    this.$store.dispatch("products/getAllProducts");
  },
  mounted() {
    // axios
    //   .get(
    //     "https://gorest.co.in/public-api/photos?access-token=SLlGFifk6F6MSa8ZjPTKcQN_qOXxpOlbjw6r",
    //     {
    //       mode: "cors"
    //     }
    //   )
    //   .then(response => {
    //     console.log(response.data.result);
    //     this.allProduct = response.data.result;
    //     console.log("all product: " + this.allProduct.length);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    //   .finally(function() {
    //     // always executed
    //   });
  }
};
</script>

<style scoped>
.container {
  border-left: 1px solid #ddd;
}
</style>