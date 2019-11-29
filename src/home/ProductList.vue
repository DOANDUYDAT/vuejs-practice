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
    ...mapActions("cart", ["addProductToCart"])
  }
};
</script>

<style lang="scss" scoped>
@import '@/style.scss';
.container {
  background-color: $it-bg-in;
}
</style>