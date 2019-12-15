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
import { searchService, productService, filterService } from "@/_api";

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
  
  methods: {
    async getData() {
      const path = this.$route.path;
      this.productsList = [];
      if (path === '/filter') {
        const query = this.$route.query;
        this.productsList = await filterService.filter(query);
      } else if (path === '/search') {
        const query = this.$route.query;
        this.productsList = await searchService.search(query);
      } else {
        this.productsList = await productService.getAllProducts();
      }

      // try {
      //   const isSuccess = await filterService.filter(query);
      //   if (isSuccess) {
      //     this.$store.dispatch("alert/success", {
      //       message: "Update Successfully!"
      //     });
      //     this.resetFilter();
      //   }
      // } catch (error) {
      //   if (error.response) {
      //     this.$store.dispatch("alert/error", {
      //       message: error.response.data.message
      //     });
      //   }
      // }
    }
    
  },
  watch: {
    $route: 'getData'
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