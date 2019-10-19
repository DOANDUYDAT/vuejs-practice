<template>
  <v-container>
    <slider-ads :topProduct="topProduct"></slider-ads>
    <v-row>
      <v-col v-for="product in allProduct" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <product-list-item :product="product"></product-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import ProductListItem from "./ProductListItem";
import SliderAds from "./SliderAds";

export default {
  components: {
    ProductListItem,
    SliderAds
  },
  data() {
    return {
      allProduct: []
    };
  },
  computed: {
    topProduct() {
      let topProduct = [];
      // Lấy 5 sản phẩm mới nhất
      if (this.allProduct.length > 0 ) {
        for (let i = 0; i < 5; i++) {
          topProduct.push(this.allProduct[i]);
        }
      }
      console.log(topProduct);
      return topProduct;
    }
  },
  mounted() {
    axios
      .get(
        "https://gorest.co.in/public-api/photos?access-token=SLlGFifk6F6MSa8ZjPTKcQN_qOXxpOlbjw6r",
        {
          mode: "cors"
        }
      )
      .then(response => {
        console.log(response.data.result);
        this.allProduct = response.data.result;
        console.log("all product: " + this.allProduct.length);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
};
</script>