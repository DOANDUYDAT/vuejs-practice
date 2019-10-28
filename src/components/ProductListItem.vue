<template>
  <v-card>
    <v-img class="white--text align-end" height="200px" :src="product.url">
      <v-card-title>{{ product.title }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">{{ product.price | currency }}</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn :disabled="!product.inventory" @click="addProductToCart(product)">MUA</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {}
  }
};
</script>

