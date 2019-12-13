<template>
  <v-container>
    <v-carousel cycle height="350" show-arrows-on-hover hide-delimiter-background>
      <v-carousel-item
        v-for="product in topProduct"
        :key="product.id"
        :src="product.images[0]"
        contain
      ></v-carousel-item>
    </v-carousel>
    <v-row no-gutters>
      <v-col v-for="product in productsList" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <product-list-item :product="product"></product-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import ProductListItem from "./ProductListItem";
import SliderAds from "./SliderAds";
import { mapState } from "vuex";
import { searchService, productService } from "@/_api";

export default {
  components: {
    ProductListItem,
    SliderAds
  },
  data() {
    return {
      productsList: []
    };
  },
  computed: {
    topProduct() {
      let topProduct = [];
      // Lấy 5 sản phẩm mới nhất
      if (this.productsList.length > 0) {
        for (let i = 0; i < 5; i++) {
          if (i >= this.productsList.length) break;
          topProduct.push(this.productsList[i]);
        }
        return topProduct;
      }
    }
    // ...mapState({
    //   products: state => state.products.allProducts
    // })
  },
  method: {
    async getData() {
      const query = this.$route.query.search;
      if (query) {
       this.productsList = await searchService.search(query);
      } else {
        this.productsList = await productService.getAllProducts();
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.container {
  background-color: $it-bg-in;
}
</style>