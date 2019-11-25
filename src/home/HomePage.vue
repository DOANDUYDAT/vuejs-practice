<template>
  <v-container>
    <v-row >
      <v-col cols="4">
        <filter-product></filter-product>
      </v-col>
      <v-col cols="8">
        <product-list></product-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductList from "./ProductList";
import FilterProduct from "../filter/FilterProduct";

export default {
  components: {
    ProductList,
    FilterProduct
  }
};
</script>

