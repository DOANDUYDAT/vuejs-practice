<template>
  <v-container>
    <v-carousel height="350" hide-delimiters>
      <v-carousel-item v-for="product in topProduct" :key="product.id" :src="product.image"></v-carousel-item>
    </v-carousel>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-img class="white--text align-end" height="200px" :src="product.image">
            <v-card-title>{{ product.title }}</v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn :disabled="!product.inventory" @click="addProductToCart(product)">MUA</v-btn>
          </v-card-actions>
        </v-card>
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
      console.log(topProduct);
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