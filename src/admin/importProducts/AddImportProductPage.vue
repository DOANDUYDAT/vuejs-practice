<template>
  <!-- <v-row justify="center" no-gutters>
  <v-col>-->
  <div>
    <!-- dùng height = 10 và dense giúp giảm height của v-text-feild về min-height = 56px của v-input__slot -->
    <v-text-field
      autocomplete="off"
      solo-inverted
      flat
      dark
      color="it-blue-lighten"
      rounded
      clearable
      hide-details
      v-model="search"
      @keyup.enter="searchProduct"
      append-icon="mdi-magnify"
      @click:append="searchProduct"
      @focus="querySelections"
      @blur="result = false"
      label="Search"
    ></v-text-field>
    <v-expand-transition>
      <v-card v-if="itemsSearch && result" class="search__result mx-auto" :width="600" light>
        <v-card-text class="subtitle-1 py-1 px-4" v-for="item in itemsSearch" :key="item.id">
          <v-row no-gutters>
            <v-col cols="4">{{ item.id }}</v-col>
            <v-col cols="8">{{ item.name }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </div>
  <!-- </v-col>
  </v-row>-->
</template>

<script>
import { mapState } from "vuex";
import { productService } from "@/_api";
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      result: false,
      products: []
    };
  },
  watch: {
    search: "querySelections"
  },
  computed: {
    productListSearch() {
      let productListSearch = this.products.map(e => {
        return {
          id: e.id,
          name: e.name
        };
      });
      return productListSearch;
    },
    itemsSearch() {
      return this.items.slice(0, 6);
    }
  },
  methods: {
    querySelections() {
      let search = this.search;

      this.loading = true;
      // Simulated ajax query

      if (search) {
        this.result = true;
        this.items = this.productListSearch.filter(e => {
          return e.id.toString().startsWith(search);
        });
      } else {
        this.items = [];
      }
      this.loading = false;
    },
    searchProduct() {
      console.log(this.search);
    },
    async getData() {
      this.products = await productService.getAllProducts();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.search__result {
  position: fixed;
}
</style>