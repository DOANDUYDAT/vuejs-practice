<template>
  <v-container class="px-0">
    <v-row >
      <v-col cols="3">
        <filter-product></filter-product>
      </v-col>
      <v-col cols="9">
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

