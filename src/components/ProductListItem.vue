<template>
  <v-card class="mx-auto" hover>
    <v-img height="200px" :src="product.images[0]"></v-img>
    <!-- <v-card-title>{{ product.gia_khuyen_mai.length > 0 ? product.gia_khuyen_mai : product.gia_ban_le }}</v-card-title> -->
  <v-card-text>
    <p>{{ descriptionProduct }}</p>
    <strong>{{ priceProduct }}đ</strong>
  </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn :disabled="!product.inventory" @click="addProductToCart({ product: product, quantity: 1 })">MUA</v-btn>
      <!-- <v-btn @click="addProductToCart(product)">MUA</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { formatCurrency } from '../_api/format-currency';

export default {
  props: {
    product: {}
  },
  computed: {
    descriptionProduct() {
      let description = this.product.title.length < 40 ? this.product.title : this.product.title.slice(0, 40) + '...';
      return description;
    },
    priceProduct() {
      let price = this.product.gia_khuyen_mai.length > 0 ? this.product.gia_khuyen_mai : this.product.gia_ban_le;
      return formatCurrency(price);
    }
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"])
  }
};
</script>

